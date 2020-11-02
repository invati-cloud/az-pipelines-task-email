import { RecipientsConfiguration } from "./RecipientsConfiguration";
import { SmtpConfiguration } from "./SmtpConfiguration";

export class MailConfiguration {

  private mailSubject: string;
  private toRecipientsConfig: RecipientsConfiguration;
  private ccRecipientsConfig: RecipientsConfiguration;
  private smtpConfig: SmtpConfiguration;
  private defaultDomain: string;
  private emailBodyFile: string;
  private emailBodyFormat: string;
  private emailBody: string;

  constructor($mailSubject: string, $toRecipientsConfig: RecipientsConfiguration, $ccRecipientsConfig: RecipientsConfiguration, $smtpConfig: SmtpConfiguration, $defaultDomain: string) {
    this.mailSubject = $mailSubject;
    this.toRecipientsConfig = $toRecipientsConfig;
    this.ccRecipientsConfig = $ccRecipientsConfig;
    this.smtpConfig = $smtpConfig;
    this.defaultDomain = $defaultDomain;
  }

  /**
   * Getter $defaultDomain
   * @return {string}
   */
  public get $defaultDomain(): string {
    return this.defaultDomain;
  }

  /**
   * Getter $mailSubject
   * @return {string}
   */
  public get $mailSubject(): string {
    return this.mailSubject;
  }

  /**
   * Getter $ccRecipientsConfig
   * @return {RecipientsConfiguration}
   */
  public get $ccRecipientsConfig(): RecipientsConfiguration {
    return this.ccRecipientsConfig;
  }

  /**
   * Getter $smtpConfig
   * @return {SmtpConfiguration}
   */
  public get $smtpConfig(): SmtpConfiguration {
    return this.smtpConfig;
  }

  /**
   * Getter $toRecipientsConfig
   * @return {RecipientsConfiguration}
   */
  public get $toRecipientsConfig(): RecipientsConfiguration {
    return this.toRecipientsConfig;
  }

  /**
 * Setter $mailSubject
 * @param {string} value
 */
  public set $mailSubject(value: string) {
    this.mailSubject = value;
  }

  /** 
  * Setter $emailBodyFile
  * @param {string} value
  */
  public set $emailBodyFile(value: string) {
    this.emailBodyFile = value;
  }
  /**
   * Getter $emailBodyFile
   * @returns {string}
   */
  public get $emailBodyFile(): string {
    return this.emailBodyFile;
  }
  /**
   * Setter $emailBodyFormat
   * @param {string} value
   */
  public set $emailBodyFormat(value: string) {
    this.emailBodyFormat = value;
  }
  /**
   * Getter $emailBodyFormat
   * @returns {string}
   */
  public get $emailBodyFormat(): string {
    return this.emailBodyFormat;
  }
  /**
   * Setter $emailBody
   * @param {string} value
   */
  public set $emailBody(value: string) {
    this.emailBody = value;
  }
  /**
   * Getter $emailBody
   * @returns {string}
   */
  public get $emailBody() {
    return this.emailBody;
  }

}