import { Notes } from './services';
export interface IDataSources {
	notes: Notes;
}

export interface IContext {
	dataSources: IDataSources;
}
