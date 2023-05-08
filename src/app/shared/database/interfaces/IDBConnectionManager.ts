export interface IDBConnectionManager {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  statusConnection: string;
}