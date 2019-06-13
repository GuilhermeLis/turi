import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public MSG_ADD_SUCESSO = 'Dados adicionados com sucesso!';
  public MSG_UPT_SUCESSO = 'Dados atualizados com sucesso!';
  public MSG_DEL_SUCESSO = 'Dados deletados com sucesso!';

  public MSG_ADD_ERRO = 'Erro ao adicionar os dados. Por favor, tente novamente!';
  public MSG_UPT_ERRO = 'Erro ao atualizar os dados. Por favor, tente novamente!';
  public MSG_DEL_ERRO = 'Erro ao deletar os dados. Por favor, tente novamente!';

  constructor(
    private FSDB: AngularFirestore,
    // private storage: Storage,
  ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  private setInitialData(data: any, createdBy: string) {
    return { timestamp: this.timestamp, createdAt: +new Date(), createdBy, ...data };
  }

  read(path: string, uid: string, orderBy: string, ascOrDesc: any) {
    return this.FSDB.collection(path, ref =>
      ref.orderBy(orderBy, ascOrDesc))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('read');
          return { id, ...data }
        }))
      )
  }

  // Você pode ordenar 
  readAll(path: string, orderBy: string, ascOrDesc: any) {
    return this.FSDB.collection(path, ref =>
      ref.orderBy(orderBy, ascOrDesc))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('read-all');
          return { id, ...data }
        }))
      )
  }

  readAllWithoutOrder(path: string) {
    return this.FSDB.collection(path)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('read-all');
          return { id, ...data }
        }))
      )
  }

  readAllPromise(path: string, orderBy?: string, ascOrDesc?: any) {

    return this.FSDB.collection(path).get().toPromise();

    // Com ordenação
    // return this.FSDB.collection(path, ref =>
    //   ref.orderBy(orderBy, ascOrDesc))
    //   .get().toPromise();
  }

  set(path: string, doc: string, data: any, name?: string) {
    return new Promise((resolve, reject) => {
      return this.FSDB.collection(path).doc(doc).set(data)
        .then(() => resolve(this.MSG_ADD_SUCESSO))
        .catch((err) => reject({ msg: this.MSG_ADD_ERRO, err }));
    });
  }

  add(path: string, data: any, createdBy?: string, name?: string) {
    return new Promise((resolve, reject) => {
      return this.FSDB.collection(path).add(this.setInitialData(data, createdBy))
        .then(() => resolve(this.MSG_ADD_SUCESSO))
        .catch((err) => reject({ msg: this.MSG_ADD_ERRO, err }));
    });
  }

  update(path: string, docId: string, data: any, name?: string) {
    return new Promise((resolve, reject) => {
      return this.FSDB.collection(path).doc(docId).update(data)
        .then(() => resolve(this.MSG_UPT_SUCESSO))
        .catch((err) => reject({ msg: this.MSG_UPT_ERRO, err }));
    });
  }

  delete(path: string, docId: string, uid?: string, name?: string) {
    return new Promise((resolve, reject) => {
      return this.FSDB.collection(path).doc(docId).delete()
        .then(() => resolve(this.MSG_DEL_SUCESSO))
        .catch((err) => reject({ msg: this.MSG_DEL_ERRO, err }));
    });
  }

  // Functions only bussiness



}
