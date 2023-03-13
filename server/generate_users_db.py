import sqlite3

if __name__ == "__main__":
    courses = []
    conn = sqlite3.connect(r'./users.sqlite')
    cur = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS users')
    cur.execute('''
    CREATE TABLE "users"(
        "username" TEXT,
        "email" EMAIL,
        "password" TEXT,
        "favorites" TEXT
    )
    ''')
    cur.close()