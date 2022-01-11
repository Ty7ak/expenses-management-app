import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TransactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly category: string;
  readonly date: string;
  readonly type: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Transaction, TransactionMetaData>);
  static copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction, TransactionMetaData>) => MutableModel<Transaction, TransactionMetaData> | void): Transaction;
}