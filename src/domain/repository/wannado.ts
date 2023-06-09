import {CharId} from '@/domain/model/valueobjects/charId';
import {initializeRealm} from '@/storage/realm';
import {Wannado as WannadoRealm} from '@/storage/realm/schema/wannado';

import {Wannado} from '../model/entity/wannado';

export class WannadoRealmRepository {
  private readonly realm = initializeRealm();

  public async create(wannado: Wannado): Promise<void> {
    this.realm.write(() => {
      this.realm.create('Wannado', wannado.serialize());
    });
  }
  public async update(wannado: Wannado): Promise<void> {
    this.realm.write(() => {
      this.realm.create(
        'Wannado',
        wannado.serialize(),
        Realm.UpdateMode.Modified,
      );
    });
  }

  public async delete(id: CharId): Promise<void> {
    const wannado = this.realm.objectForPrimaryKey<WannadoRealm>(
      'Wannado',
      id.id,
    );
    const todos = wannado?.todoList.todos;
    const memos = wannado?.memoList.memos;
    const links = wannado?.linkList.links;
    const todoList = wannado?.todoList;
    const memoList = wannado?.memoList;
    const linkList = wannado?.linkList;
    this.realm.write(() => {
      this.realm.delete(todos);
      this.realm.delete(memos);
      this.realm.delete(links);
      this.realm.delete(todoList);
      this.realm.delete(memoList);
      this.realm.delete(linkList);
      this.realm.delete(wannado);
    });
  }

  public async find(id: CharId): Promise<Wannado | undefined> {
    const wannado = this.realm.objectForPrimaryKey<WannadoRealm>(
      'Wannado',
      id.id,
    );
    return wannado?.toEntity();
  }

  public async findAll(): Promise<Wannado[]> {
    const wannados = this.realm.objects<WannadoRealm>('Wannado');
    return wannados.map(wannado => wannado.toEntity());
  }
}
