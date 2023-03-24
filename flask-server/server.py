from flask import Flask,request
from flask_cors import CORS, cross_origin
import mysql.connector
import os
import json

ROOT_DIR = os.path.realpath(os.path.join(os.path.dirname(__file__), 'C:\Semester 4\Project\flask-server'))


app=Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


# try:
#     cnx = mysql.connector.connect(user='root', password='Pranavam@63',
#                                  host='localhost',
#                                  database='lib')
#     my_cursor=cnx.cursor()
#     print("Connected to the database!!")

# except Exception as e:
#     print("Error",e)


@app.route('/book/<email>/<id>')
def getBook(email,id):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")
        status=0
        result=[]
        sql = "select * from books where id=%s"
        id_sql=[int(id)]
        print(type(id_sql)) 
        # Executing query
        my_cursor.execute(sql,id_sql)
        
        myresult = my_cursor.fetchall()
        for x in myresult:
            for i in x:
                print(i)
                result.append(i)

        sql1 = "select user_id from users where email=%s;"
        id_sql1=[email]
        my_cursor.execute(sql1,id_sql1)
        
        myresult = my_cursor.fetchall()
        userid=0
        for x in myresult:
            print(x[0])
            userid=x[0]

        sql2 = "select rent_status from user_book where user_id=%s and book_id=%s;"
        id_sql2=[userid,int(id)]
        my_cursor.execute(sql2,id_sql2)
        myresult1 = my_cursor.fetchall()
        for x in myresult1:
            print(x[0])
            status=x[0]
        result.append(status)

        sql3 = "select authored from user_book where user_id=%s and book_id=%s;"
        id_sql3=[userid,int(id)]
        my_cursor.execute(sql3,id_sql3)
        myresult3 = my_cursor.fetchall()
        for x in myresult3:
            print(x[0])
            status=x[0]
        result.append(status)
        print(result) 
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()   
    return result

@app.route('/login',methods=['POST'])
def signin():
    data=request.json
    print(data)
    print(data["email"])
    return request.json


@app.route('/signup',methods=['POST','GET'])
def signup():
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")
        data=request.json
        print(data)
        
        insert_stmt = (
        "INSERT INTO users (first_name, last_name, email, passwd) "
        "VALUES (%s, %s, %s,%s)"
        )
        firstName=data["firstName"]
        lastName=data["lastName"]
        email=data["email"]
        password=data["password"]

        data = (firstName, lastName, email,password)
        my_cursor.execute(insert_stmt, data)
        cnx.commit()
        print(my_cursor.rowcount, "record inserted.")

        sql = "select max(user_id) from users;"
        
        # Executing query
        my_cursor.execute(sql)
        
        myresult = my_cursor.fetchall()
        userid=""
        for x in myresult:
            print(x[0])
            userid=x[0]
        print(myresult)

        sql1 = "select id from books;"
        
        # Executing query
        my_cursor.execute(sql1)
        
        myresult1 = my_cursor.fetchall()
        bookid=[]
        for x in myresult1:
            print(x[0])
            bookid.append(x[0])
        print(bookid)

        insert_stmt_1 = (
        "INSERT INTO user_book (user_id, book_id, rent_status,authored) "
        "VALUES (%s, %s, %s, %s)"
        )

        for x in bookid:
            data1 = (userid,x,0, 0)
            my_cursor.execute(insert_stmt_1, data1)
            cnx.commit()
            print(my_cursor.rowcount, "record inserted.")
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return request.json


@app.route('/books',methods=['GET'])
def getBooks():
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")

        sql = "select * from books;"
        
        # Executing query
        my_cursor.execute(sql)
        
        myresult = my_cursor.fetchall()
        for x in myresult:
            print(x)
        print(myresult)
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return myresult

@app.route('/books/<email>/rentedBooks',methods=['GET'])
def getRentedBooks(email):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")

        print(email)
        sql = "select user_id from users where email=%s;"
        id_sql=[email]
        my_cursor.execute(sql,id_sql)
        
        myresult = my_cursor.fetchall()
        userid=0
        print(myresult)
        for x in myresult:
            print(x[0])
            userid=x[0]

        sql1 = "select book_id from user_book where user_id=%s and rent_status=%s;"
        data1=[userid,1]
        my_cursor.execute(sql1,data1)
        myresult1 = my_cursor.fetchall()
        print(myresult1)
        res=[]
        for x in myresult1:
                print(x[0])
                res.append(x[0])
        print(res)
        if(len(res)==0):
            myresult2=[]
        elif(len(res)==1):
            sql2 = "select * from books where id=%s"
            my_cursor.execute(sql2,res)
            myresult2 = my_cursor.fetchall()
            for x in myresult2:
                print(x)
            print(myresult2)
        else:
            t=tuple(res)
            print(t)
            sql2 = "select * from books where id in {}".format(t)
            my_cursor.execute(sql2)
            myresult2 = my_cursor.fetchall()
            for x in myresult2:
                print(x)
            print(myresult2)
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return myresult2

@app.route('/books/<email>/authored',methods=['GET'])
def getAuthoredBooks(email):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")

        print(email)
        sql = "select user_id from users where email=%s;"
        id_sql=[email]
        my_cursor.execute(sql,id_sql)
        
        myresult = my_cursor.fetchall()
        userid=0
        print(myresult)
        for x in myresult:
            print(x[0])
            userid=x[0]

        sql1 = "select book_id from user_book where user_id=%s and authored=%s;"
        data1=[userid,1]
        my_cursor.execute(sql1,data1)
        myresult1 = my_cursor.fetchall()
        print(myresult1)
        res=[]
        for x in myresult1:
                print(x[0])
                res.append(x[0])
        print(res)
        if(len(res)==0):
            myresult2=[]
        elif(len(res)==1):
            sql2 = "select * from books where id=%s"
            my_cursor.execute(sql2,res)
            myresult2 = my_cursor.fetchall()
            for x in myresult2:
                print(x)
            print(myresult2)
        else:
            t=tuple(res)
            print(t)
            sql2 = "select * from books where id in {}".format(t)
            my_cursor.execute(sql2)
            myresult2 = my_cursor.fetchall()
            for x in myresult2:
                print(x)
            print(myresult2)
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return myresult2

# @app.route('/book/<email>/<id>/getRent',methods=['GET'])
# def getRentStatus(email,id):
#     print("Entered getRentStatus()")
#     sql1 = "select user_id from users where email=%s;"
#     id_sql1=[email]
#     my_cursor.execute(sql1,id_sql1)
    
#     myresult = my_cursor.fetchall()
#     userid=0
#     for x in myresult:
#         print(x[0])
#         userid=x[0]

#     sql = "select * from user_book where user_id=%s and book_id=%s;"
#     id_sql=[userid,int(id)]
#     my_cursor.execute(sql,id_sql)
    
#     myresult = my_cursor.fetchall()
#     for x in myresult:
#         print(x)
#     print(myresult)
#     return myresult

@app.route('/book/<email>/<id>/changeRent',methods=['POST'])
def changeRentStatus(email,id):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")

        print("Entered changeRentStatus()")
        sql2 = "select user_id from users where email=%s;"
        id_sql2=[email]
        my_cursor.execute(sql2,id_sql2)
        
        myresult = my_cursor.fetchall()
        userid=0
        for x in myresult:
            print(x[0])
            userid=x[0]

        sql = "select rent_status from user_book where user_id=%s and book_id=%s;"
        id_sql=[userid,int(id)]
        # Executing query
        my_cursor.execute(sql,id_sql)
        rentStatus=""
        myresult = my_cursor.fetchall()
        for x in myresult:
            print(x[0])
            rentStatus=x[0]
        print(myresult)

        status=0
        if(rentStatus==0):
            status=1
        else:
            status=0
        
        sql1 = "update user_book set rent_status=%s where user_id=%s and book_id=%s;"
        data1 = (status,userid,id)
        my_cursor.execute(sql1,data1)
        cnx.commit()
        
        sql = "select rent_status from user_book where user_id=%s and book_id=%s;"
        id_sql=[userid,int(id)]
        my_cursor.execute(sql,id_sql)
        
        myresult = my_cursor.fetchall()
        for x in myresult:
            print(x)
        print(myresult)
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return myresult

@app.route('/book/<email>/addBook',methods=['POST'])
def addBooks(email):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")
        
        sql2 = "select user_id from users where email=%s;"
        id_sql2=[email]
        my_cursor.execute(sql2,id_sql2)
        
        myresult = my_cursor.fetchall()
        userid=0
        for x in myresult:
            print(x[0])
            userid=x[0]

        
        data=request.form
        print(data)
        # f=request.files["file"]
        f=request.files["files[0]"]
        fname=request.form.get("fileName[0]")
        print(f)
        print(fname)

        # for f in obj:
        #     print(f)
        f.save(os.path.join("C:/Semester 4/Project/client/public/Images/",fname))

        pdf=request.files["files[1]"]
        pdfname=request.form.get("fileName[1]")
        print(pdf)
        print(pdfname)
        pdf.save(os.path.join("C:/Semester 4/Project/client/public/PDF/",pdfname))

        name=data["name"]
        author=data["author"]
        description=data["description"]


        sql = ("INSERT INTO books (name, author, description, image, pdf, added_by)"
        "VALUES (%s, %s, %s, %s, %s, %s)")
        data1=(name,author,description,fname,pdfname,userid)
        # Executing query
        my_cursor.execute(sql,data1)
        cnx.commit()
        print(my_cursor.rowcount, "record inserted.")

        sql4 = "select max(id) from books;"
        
        # Executing query
        my_cursor.execute(sql4)
        
        myresult1 = my_cursor.fetchall()
        bookid=0
        for x in myresult1:
            print(x[0])
            bookid=x[0]
        print(myresult1)

        # obj=request.files['file']  
        # print(obj)
        # for i in obj:
        #     print(i)
        # obj.save(os.path.join("C:/Semester 4/Project/flask-server/Images/",obj.filename))

        # pdf=request.files['file']  
        # print(pdf)
        # pdf.save(os.path.join("C:/Semester 4/Project/flask-server/PDF/",pdf.filename))

        sql3 = ("INSERT INTO user_book (user_id, book_id, rent_status,authored)"
        "VALUES (%s, %s, %s, %s)")
        
        data3=(userid,bookid,0,1)
        # Executing query
        my_cursor.execute(sql3,data3)
        cnx.commit()
        print(my_cursor.rowcount, "record inserted.")

        sql4 = "select user_id from users where user_id!=%s;"
        data4=[int(userid)]
        # Executing query
        my_cursor.execute(sql4,data4)
        
        myresult4 = my_cursor.fetchall()
        users=[]
        for x in myresult4:
            print(x[0])
            users.append(x[0])
        print(users)

        insert_stmt_5 = (
        "INSERT INTO user_book (user_id, book_id, rent_status,authored) "
        "VALUES (%s, %s, %s, %s)"
        )

        for x in users:
            data5 = (x,bookid,0, 0)
            my_cursor.execute(insert_stmt_5, data5)
            cnx.commit()
            print(my_cursor.rowcount, "record inserted.")
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return request.json

@app.route('/book/<email>/<id>/removeBook',methods=['POST'])
def removeBooks(email,id):
    try:
        cnx = mysql.connector.connect(user='root', password='Pranavam@63',
                                    host='localhost',
                                    database='lib')
        my_cursor=cnx.cursor()
        print("Connected to the database!!")
        sql2 = "select user_id from users where email=%s;"
        id_sql2=[email]
        my_cursor.execute(sql2,id_sql2)
        
        myresult = my_cursor.fetchall()
        userid=0
        for x in myresult:
            print(x[0])
            userid=x[0]
        print(id)
        sql3 = ("Delete from user_book where book_id=%s")
        
        data3=[int(id)]
        my_cursor.execute(sql3,data3)
        cnx.commit()
        print(my_cursor.rowcount, "record Deleted.")

        sql4 = ("Delete from books where id=%s")
        
        data4=[int(id)]
        my_cursor.execute(sql4,data4)
        cnx.commit()
        print(my_cursor.rowcount, "record Deleted.")
    except Exception as e:
        print("Error",e)
    finally:
        cnx.close()
    return request.json    


@app.after_request
def creds(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Origin']='*'
    response.headers['Access-Control-Allow-Headers']='*'
    return response

if __name__ == "__main__":
    app.run(debug=True)

