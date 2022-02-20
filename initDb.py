import mysql.connector
import random
import os
from dotenv import load_dotenv

class DataGeneration:
    def __init__(self):

        load_dotenv()

        self.db = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PWD'),
        )
        self.cursor = self.db.cursor()

        

        self.empty = self.init_database() # kanske använder ngn gång (måste ha en användre i databsen)
        input("Klicka enter när du har skapat en användare")


    def parse_data(self):
        with open("prototyp/databas/slutproject_databas_schema.sql") as f:
            lines = f.readlines()
            print(lines)
            print("\n"*5)
        
        quries = []
        tmp = ""
        for line in lines:
            # Hoppa över ifall det är en kommentar
            if "--" in line:
                continue

            # appenda line till tmp tills line innehåller ");" 
            line = line.replace("\n", "")
            tmp += line
            if ");" in line:
                quries.append(tmp)
                print(tmp)
                tmp = ""
        
        return quries


    def init_database(self):
        self.cursor.execute("SHOW DATABASES")
        for x in self.cursor:
            if os.getenv('DB_NAME') in x:
                print("database exists already, remove it and then run this again.")
                return False
        else:
            # Skapa databas
            self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}")
            self.cursor.execute(f"USE {os.getenv('DB_NAME')}")
            self.db.commit()


            # Generera tabeller
            with open("prototyp/databas/slutproject_databas_schema.sql") as f:
                lines = f.readlines()
                print(lines)

            queries = self.parse_data()

            for query in queries:
                self.cursor.execute(query)
            self.db.commit()

            return True

    
    def create_product(self, product_name, product_descripton,):
        sql = "INSERT INTO `products` (`name`, `description`) VALUES (%s, %s)"
        values = (product_name, product_descripton)
        print(sql, values)
        self.cursor.execute(sql, values)
        self.cursor.execute("SET @PRODUCT_ID =(SELECT LAST_INSERT_ID() )")

    def create_review(self, rating, review_title, review_content):
        sql = "INSERT INTO `reviews` (`rating`, `title`, `content`) VALUES (%s, %s, %s)"
        values = (rating, review_title, review_content)

        print(sql, values)
        self.cursor.execute(sql, values)

        self.cursor.execute("SET @REVIEW_ID = (SELECT LAST_INSERT_ID() )")

    def create_test_product_reviews(self,):
        sql = "INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) VALUES ((SELECT id FROM users WHERE discord_id = '322015089529978880'), @REVIEW_ID, @PRODUCT_ID)"
        print(sql)
        self.cursor.execute(sql)

    def generate(self):
        # Skapa 100 producter
        for i_product in range(100):
            product_name = "poduct " + str(i_product)
            product_desc = "description " + str(i_product)
            self.create_product(product_name, product_desc)
            
            # Varje produkt ska ha 20 reviews
            for i_review in range(20):
                rating = random.randrange(0, 5)
                review_title = "review " + str(i_review)
                review_content = "review desc " + str(i_review)
                self.create_review(rating, review_title, review_content)

                self.create_test_product_reviews()
                
        self.db.commit()

        print("Data has been generated", self.cursor.rowcount)


d = DataGeneration()

d.generate()



