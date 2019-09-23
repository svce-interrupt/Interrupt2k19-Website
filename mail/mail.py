import os

# email
import smtplib
from email.message import EmailMessage

#import for postgres
import psycopg2 as psy

# QR code imports
import pyqrcode 
from pyqrcode import QRCode 
import imghdr

#(dload pypng to convert to png)
import matplotlib.pyplot as plt
import matplotlib.image as img


email_id = "interrupt2k19@gmail.com" 
email_pwd = "interrupt@svce"

dbuser = "shravan"
dbpwd = "0223"

conn = psy.connect(port=5432, database='interrupt', user=dbuser, password=dbpwd)
cur = conn.cursor()

content_location = 'content/welcome.txt'

def get_content(name):

    content = open(content_location,'r')

    return f'Hey there, {name}!\n\n' +  content.read()



def send_mail(user, password, message):
    try:
        server_ssl = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server_ssl.ehlo()
        server_ssl.login(user,password)  
        server_ssl.send_message(message)
        server_ssl.close()
        print('successfully sent the mail')
    except:
        print("failed to send mail")


def welcome_mail():

    try :

        cur.execute("select student_name, id, email from students")
        rows = cur.fetchall()

        if len(rows) != 0:

            for row in rows:
                row = list(row)

                query = """select "studentId" from mail where "studentId" = %s"""
                cur.execute(query, (row[1],))
                
                if cur.fetchone() is None:

                    message = EmailMessage()
                    message['Subject'] = "SVCE-INTERRUPT 2K19 | welcome"
                    message['From'] = email_id
                    message['To'] = row[2]
                    message.set_content(get_content(row[0]))
                    qrstring = '\n'.join(list(map(str,row)))
                    print(row)
                    qrcode = pyqrcode.create(qrstring, mode='binary')
                    qrcode.png(f"QRcodes/{row[1]}.png", scale=4, background=[0xff, 0xff, 0xff])

                    with open(f'QRcodes/{row[1]}.png','rb') as qr:
                        message.add_attachment(qr.read(),filename = qr.name, maintype='image', subtype=imghdr.what(qr.name))


                    query = """insert into mail(student_name, "studentId", email, "createdAt", "updatedAt") values(%s, %s, %s, now(), now()) returning id;"""
                    cur.execute(query, (row[0], row[1], row[2]))

                    mail_id = cur.fetchone()[0]
                    send_mail(email_id, email_pwd, message)
                    conn.commit()
            cur.close()

    except (Exception, psy.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

if __name__ == "__main__":
    welcome_mail()