package db.mysql;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;

//创建表格和初始化数据
public class MySQLTableCreation3 {
	// Run this as Java application to reset db schema.
	public static void main(String[] args) {
		try {
			// Step 1 Connect to MySQL.
			System.out.println("Connecting to " + MySQLDBUtil.URL);
			Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();//"com.mysql.cj.jdbc.Driver"： Driver class在java VM里面调用的时候，Driver注册自己
			Connection conn = DriverManager.getConnection(MySQLDBUtil.URL);// set the connection，DriverManager是在所有注册过的driver里面找到合适的建立连接//这里的URL是在MySQLDBUtil里定义了
			                  //调用Driver Manager的方法
			if (conn == null) {
				return;
			}
			
			// Step 2 Drop tables in case they exist.	
						Statement stmt = conn.createStatement();//static//写全的
						String sql = "DROP TABLE IF EXISTS categories";
						stmt.executeUpdate(sql);
						
						sql = "DROP TABLE IF EXISTS history";
						stmt.executeUpdate(sql);
						
						sql = "DROP TABLE IF EXISTS users";
						stmt.executeUpdate(sql);
						
						sql = "DROP TABLE IF EXISTS items";
						stmt.executeUpdate(sql);

			
						// Step 3 Create new tables
						sql = "CREATE TABLE items ("
								+ "item_id VARCHAR(255) NOT NULL,"
								+ "name VARCHAR(255),"
								+ "rating FLOAT,"
								+ "address VARCHAR(255),"
								+ "image_url VARCHAR(255),"
								+ "url VARCHAR(255),"
								+ "distance FLOAT,"
								+ "PRIMARY KEY (item_id)"
								+ ")";
						stmt.executeUpdate(sql);
						
						sql = "CREATE TABLE users ("
								+ "user_id VARCHAR(255) NOT NULL,"
								+ "password VARCHAR(255) NOT NULL,"
								+ "first_name VARCHAR(255),"
								+ "last_name VARCHAR(255),"
								+ "PRIMARY KEY (user_id)"
								+ ")";
						stmt.executeUpdate(sql);
						
						sql = "CREATE TABLE categories ("
								+ "item_id VARCHAR(255) NOT NULL,"
								+ "category VARCHAR(255) NOT NULL,"
								+ "PRIMARY KEY (item_id, category),"
								+ "FOREIGN KEY (item_id) REFERENCES items(item_id)"
								+ ")";
						stmt.executeUpdate(sql);
						
						sql = "CREATE TABLE history ("
								+ "user_id VARCHAR(255) NOT NULL,"
								+ "item_id VARCHAR(255) NOT NULL,"
								+ "last_favor_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
								+ "PRIMARY KEY (user_id, item_id),"
								+ "FOREIGN KEY (user_id) REFERENCES users(user_id),"
								+ "FOREIGN KEY (item_id) REFERENCES items(item_id)"
								+ ")";
						stmt.executeUpdate(sql);

						// Step 4: insert fake user 1111/3229c1097c00d497a0fd282d586be050
						sql = "INSERT INTO users VALUES ('1111', '3229c1097c00d497a0fd282d586be050', 'John', 'Smith')";
						stmt.executeUpdate(sql);
						

			
			System.out.println("Import done successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

