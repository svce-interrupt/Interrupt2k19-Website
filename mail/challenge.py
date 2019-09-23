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


email_id = os.environ.get('EMAIL') or "interrupt2k19@gmail.com" 
email_pwd = os.environ.get('PASS') or "interrupt@svce"

dbuser = os.environ.get('DBUSER') or "shravan"
dbpwd = os.environ.get('DBPASS') or "0223"

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
        print('Sent successfully')
    except:
        print("failed to send mail")


def challenge_mail():

    # try :

    cur.execute("""select student_name, 'studentId', email from mail where "hasVoted" = false""")
    rows = cur.fetchall()

    if len(rows) != 0:

        for row in rows:
            row = list(row)

            message = EmailMessage()
            message['Subject'] = "SVCE-INTERRUPT 2K19 | Interrupt Challenge"
            message['From'] = email_id
            message['To'] = row[2]
            message.set_content(get_content(row[0]))

            query = """update mail set "hasVoted" = true where 'studentId' = %s returning id;""";
            cur.execute(query, (row[1],))

            mail_id = cur.fetchone()[0]
            print(mail_id,row)
            send_mail(email_id, email_pwd, message)
            conn.commit()
        cur.close()

    # except (Exception, psy.DatabaseError) as error:
    #     print(error)
    # finally:
    #     if conn is not None:
    #         conn.close()

if __name__ == "__main__":
    challenge_mail()