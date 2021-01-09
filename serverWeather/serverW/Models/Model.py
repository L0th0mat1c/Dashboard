from datetime import datetime 
from flask import  session, redirect, url_for
from serverW.Config import db


class Model():

    

    def __init__(self):
        

        pass


    def getAll(self, table):
        dbr = db.get_db()
        if table == "widgets":
            cur = dbr.execute('SELECT * FROM widgets').fetchall()

            return cur
        elif table == 'users':
            cur = dbr.execute('SELECT * FROM users').fetchall()
            return cur

       


    def get(self, table, id =None, name = None, userId=None ):
        dbr = db.get_db()
        
        if table == "users":
            if name is not None:
                print('username', name)
                cur = dbr.execute('SELECT * FROM users WHERE name = ?', (name,)).fetchone()    
                print('cur', cur)
                return cur
            elif id is not None:
                cur = dbr.execute('SELECT * FROM users WHERE id = ?', (id,)).fetchone()           
                return cur
            elif name is None and id is None:
                cur = dbr.execute('SELECT * FROM users').fetchall()
                return cur
        if table == "widgets":
            print('id', id)
            if id is not None:
                cur = dbr.execute('SELECT * FROM widgets WHERE id=?', (id,)).fetchone()   
                print('cur', cur)        
                return cur
            else:
                cur = dbr.execute('SELECT * FROM widgets').fetchall()
                return cur
        


    def update(self, table, data):
        dbr = db.get_db()
        if table == "users":
            dbr.execute('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', 
            (data['name'], data['email'], data['password'], data['id'])
            )
            dbr.commit()
        if table == "widgets":
            dbr.execute('UPDATE widgets SET name = ? WHERE id = ?', 
            (data["name"], data['id'])
            )
            dbr.commit()
            
        return 


    def delete(self, table, id):
        dbr = db.get_db()
        if table == "users":
            dbr.execute('DELETE FROM users WHERE id = ?', 
            (id)
            )
            dbr.commit()
        if table == "widgets":
            dbr.execute('DELETE FROM widgets WHERE id = ?', 
            (id)
            )
            dbr.commit()
            
        return

    def add(self, table, data):
        dbr = db.get_db()
        if table == "users":

            print('type', type(dbr))
            dbr.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            (data['name'], data['email'], data['password'])
            )
            dbr.commit()
        if table == "widgets":
            dbr.execute('INSERT INTO widgets (name) VALUES (?)', 
            (data["name"])
            )
            dbr.commit()

        return
