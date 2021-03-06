import tl = require("azure-pipelines-task-lib/task");
import { EmailReportViewModel } from '../model/viewmodel/EmailReportViewModel';
import { IHTMLReportCreator } from './IHTMLReportCreator';
import { Report } from '../model/Report';
import { ReportConfiguration } from '../config/ReportConfiguration';
import { MailConfiguration } from '../config/mail/MailConfiguration';
import { reject } from 'q';
const fs = require("fs");
const o2x = require('object-to-xml');
const xsltProcessor = require("xslt-processor");
const { xmlParse, xsltProcess } = xsltProcessor;

export class HTMLReportCreator implements IHTMLReportCreator {

  createHtmlReport(report: Report, reportConfiguration: ReportConfiguration): string {
    const currDir = __dirname;
    console.log(`CurrentDir: ${currDir}`);
    var xsltTemplatePath = `${currDir}\\EmailTemplate.xslt`;
    console.log("Loading Email Template: " + xsltTemplatePath);

    // Create a view model object before serialize to xml
    const reportViewModel = new EmailReportViewModel(report, reportConfiguration);
    // Serialize gathered data into xml 
    const xmlString: string = "<EmailReportViewModel>" + o2x(reportViewModel) + "</EmailReportViewModel>";
    // Read XSLT email template 
    const buffer = fs.readFileSync(xsltTemplatePath);
    // Parse the xml string as XmlDocument/Node
    const xmlDoc = xmlParse(xmlString, "text/xml");
    // Parse XSLT as XMLDocument
    const xsltDoc = xmlParse(buffer.toString(), "application/xml");
    // Fill the XSLT document template with the xml doc data
    let outXmlString = xsltProcess(xmlDoc, xsltDoc);

    // XML parsing changes <br/> to special chars if they are part of xml nodevalues. Do string replace to fix the jankiness for HTML.
    outXmlString = outXmlString.split("&lt;br/&gt;").join("<br/>");
    
    const bodySetting : string = this.getMailContentInputs(reportConfiguration.$mailConfiguration);
    
    let bodyfinal = outXmlString.replace("{{EmailBody}}", bodySetting);  
    
    return bodyfinal //outXmlString;
  }

  private getMailContentInputs(mailconfig: MailConfiguration): string {
    
    let emailBodyFinal: string;

    switch (mailconfig.$emailBodyFormat.toLowerCase()) {
      case 'file':

        if (!fs.existsSync(mailconfig.$emailBodyFile)) {
          reject(`Failed to locate the email file on disk ${mailconfig.$emailBodyFile}`);
          return "";
        }

        emailBodyFinal = fs.readFileSync(mailconfig.$emailBodyFile, 'utf8');
        
        emailBodyFinal = this.expandVariables(emailBodyFinal);

        break;
      case 'inline':
        emailBodyFinal = mailconfig.$emailBody;
        break;
      default:
        emailBodyFinal = mailconfig.$emailBody;
        break;
      }

    return "<p>" + emailBodyFinal + "</p>";    
    }

    private expandVariables(str : string) : string{
      let vars = tl.getVariables();
      let xpstr = str;
      //console.log("Variables Dumping:");
      vars.forEach(element => {
        xpstr = xpstr.replace("$(" + element.name + ")", element.value);      
        //console.log(`${element.name} : ${element.value}`);
      });
      return xpstr;
    }
  }