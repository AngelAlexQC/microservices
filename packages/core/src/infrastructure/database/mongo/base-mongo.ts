import mongoose, { Model, Schema, model } from 'mongoose';
import { mongoUrl, mongoAuthDbName } from '../../../config/auth';
import AbstractRepository from '../../../domain/repositories/abstract.repository';

export default class BaseMongo<T> implements AbstractRepository<T> {
  protected baseModel: Model<T>;
  private collectionName: string;
  constructor(schema: Schema, collectionName: string) {
    // Connect to MongoDB
    mongoose
      .connect(mongoUrl, {
        dbName: mongoAuthDbName,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB, collection:', collectionName);
      });
    // This is for not create duplicate instances of the same model
    this.baseModel =
      mongoose.models[collectionName] || model<T>(collectionName, schema);
    this.collectionName = collectionName;
    // On create, clone _id to id
    this.baseModel.schema.pre('save', function (next) {
      if (this._id) {
        this.id = this._id;
      }
      next();
    });
  }

  async getAll(): Promise<T[]> {
    const documents = await this.baseModel.find().exec();
    if (!documents || documents.length === 0) {
      return [];
    }
    return documents.map((document) => document.toObject());
  }

  async getById(id: string): Promise<T> {
    const foundDocument = await this.baseModel.findOne({ id }).exec();
    if (!foundDocument) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    return foundDocument.toObject();
  }

  async getFirst(): Promise<T> {
    const documents = await this.baseModel.find().exec();
    if (!documents || documents.length === 0) {
      throw new Error(`No documents found in ${this.collectionName}`);
    }
    return documents[0].toObject();
  }

  async create(object: T): Promise<T> {
    const newDocument = new this.baseModel(object);
    const savedDocument = await newDocument.save();
    return savedDocument.toObject();
  }
  async update(id: string, object: T): Promise<T> {
    const updatedDocument = await this.baseModel
      .findByIdAndUpdate(id, object)
      .exec();
    if (!updatedDocument) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    return updatedDocument.toObject();
  }
  async delete(id: string): Promise<void> {
    await this.baseModel.findByIdAndDelete(id).exec();
  }

  async getBy(query: object): Promise<T[]> {
    const documents = await this.baseModel.find(query).exec();
    if (!documents || documents.length === 0) {
      return [];
    }
    return documents.map((document) => document.toObject());
  }

  async patch(id: string, object: Partial<Omit<T, 'id'>>): Promise<T> {
    const document = await this.getById(id);
    if (!document) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    const documentToUpdate = await this.baseModel.findOne({ id }).exec();
    if (!documentToUpdate) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    const updatedDocument = await documentToUpdate.update(object).exec();
    return updatedDocument;
  }
}
