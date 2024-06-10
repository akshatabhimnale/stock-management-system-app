import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch inventory data when the component mounts
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    fetch(
      "https://stock-management-system-server.onrender.com/admin/api/inventories"
    )
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error("Error fetching inventory:", error));
  };

  const addItem = () => {
    if (newItem.trim() === "") {
      Alert.alert("Error", "Please enter an item name");
      return;
    }
    addItemAPI();
  };

  const addItemAPI = () => {
    fetch(
      "https://stock-management-system-server.onrender.com/admin/api/add-inventory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname: newItem }), // Ensure this matches your backend's expected field
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Inventory Added") {
          setInventory((prevInventory) => [
            ...prevInventory,
            { _id: data.id, firstname: newItem }, // Assuming the server returns the ID of the newly added inventory
          ]);
          setNewItem("");
        } else {
          Alert.alert("Error", "Failed to add item to the database");
        }
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        Alert.alert("Error", "Failed to add item to the database");
      });
  };

  const deleteItem = (_id) => {
    deleteItemAPI(_id);
  };

  const deleteItemAPI = (_id) => {
    console.log("Deleting item with id:", _id);
    fetch(
      `https://stock-management-system-server.onrender.com/admin/api/delete-inventory/${_id}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          setInventory((prevInventory) =>
            prevInventory.filter((item) => item._id !== _id)
          );
        } else {
          console.error("Error deleting item:", response.status);
          response.text().then((errorMessage) => {
            console.error("Error message:", errorMessage);
            Alert.alert("Error", "Failed to delete item from the database");
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        Alert.alert("Error", "Failed to delete item from the database");
      });
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemText}>{item.firstname}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item._id)}
      >
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item) => item._id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Inventory Items</Text>
        <Text style={styles.cardCount}>{inventory.length}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter new item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={inventory}
        renderItem={renderInventoryItem}
        keyExtractor={keyExtractor}
        style={styles.inventoryList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inventoryList: {
    flex: 1,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    borderRadius: 4,
  },
});

export default Dashboard;
