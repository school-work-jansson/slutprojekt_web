import mysql.connector
import random, string
import os
from dotenv import load_dotenv
load_dotenv()

class Database:
    def __init__(self):
        self.db = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PWD'),
        )

        
        self.cursor = self.db.cursor()

        if not self.database_exists():
            self.init_database()
            input("Klicka enter när du har skapat en användare")
            print("Fortsätter...")

        
        self.name = os.getenv('DB_NAME')
    
    def database_exists(self):
        self.cursor.execute("SHOW DATABASES")
        databases = self.cursor.fetchall()
        print(databases)
        for x in databases:
            if os.getenv('DB_NAME') in x:
                print("database already exists. skipping generation of database..")
                self.cursor.execute(f"USE {os.getenv('DB_NAME')}")        
                return True

        return False

    def init_database(self):
        # print(self.db.cmd_query("SHOW DATABASES"))
        # Skapa databas
        self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}")
        self.cursor.execute(f"USE {os.getenv('DB_NAME')}")

        # Generera tabeller
        queries = self.parse_schema_file()

        for query in queries:
            self.cursor.execute(query)
        
        self.db.commit()

    def parse_schema_file(self):
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


class DataGeneration:
    def __init__(self):
        database = Database()


        self.db = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PWD'),
            database = database.name
        )
        
        self.cursor = self.db.cursor()

        self.lorem = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec adipiscing tristique risus nec feugiat in. Maecenas sed enim ut sem viverra aliquet eget. Interdum velit euismod in pellentesque massa placerat. Venenatis urna cursus eget nunc scelerisque viverra mauris. Pretium lectus quam id leo in vitae turpis. Tincidunt vitae semper quis lectus nulla. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Et odio pellentesque diam volutpat commodo sed egestas. Amet consectetur adipiscing elit pellentesque habitant morbi."""

    def generate_hash(self):
        
        hash = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=7))

        # (hash,) kommat var väldigt viktigt annars parsade den inte som tuple
        self.cursor.execute("SELECT hash FROM `products` WHERE hash = %s", (hash,))

        # print(hash)
        if self.cursor.fetchall():
            self.generate_hash()
        
        return hash
        
    
    def create_product(self, product_name, product_descripton,):
        sql = "INSERT INTO `products` (`hash`, `name`, `description`) VALUES (%s, %s, %s)"
        hash = self.generate_hash()
        values = (hash, product_name, product_descripton)
        # print(sql, values) ###
        self.cursor.execute(sql, values)
        self.db.commit()
        
        self.cursor.execute("SELECT LAST_INSERT_ID()")
        return self.cursor.fetchall()[0][0]

    def create_review(self, rating, review_title, review_content):
        sql = "INSERT INTO `reviews` (`rating`, `title`, `content`) VALUES (%s, %s, %s)"
        values = (rating, review_title, review_content)

        # print(sql, values)
        self.cursor.execute(sql, values)
        self.db.commit()

        self.cursor.execute("SELECT LAST_INSERT_ID()")
        return self.cursor.fetchall()[0][0]

    def create_test_product_reviews(self, review_id, product_id):
        sql = "INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) VALUES ((SELECT id FROM users WHERE discord_id = '322015089529978880'), %s, %s)"
        # print(sql)
        self.cursor.execute(sql, (review_id, product_id))

    def generate(self):
        print("Generating...")
        # Skapa 100 producter
        for i_product in range(100):
            product_name = "product " + str(i_product)
            product_desc = "description " + str(i_product) + self.lorem
            product_id = self.create_product(product_name, product_desc)
            
            # Varje produkt ska ha 20 reviews
            for i_review in range(20):
                # rating = random.randrange(0, 5)
                rating = random.randrange(1, 5)
                review_title = "review " + str(i_review)
                review_content = "review desc " + str(i_review) + self.lorem
                review_id = self.create_review(rating, review_title, review_content)

                self.create_test_product_reviews(review_id, product_id)
                
        self.db.commit()

        # print("Data has been generated", self.cursor.rowcount)


d = DataGeneration()

d.generate()


# print(d.generate_hash())
