import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

const Distributor = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Inventory Item 1", status: "Pending" },
    { id: 2, name: "Inventory Item 2", status: "Pending" },
    // Add more inventory items as needed
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    joiningDate: "",
    employeeId: "",
    phoneNumber: "",
    address: "",
    department: "",
  });

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEmployeeDetails({
      firstName: "",
      lastName: "",
      gender: "",
      joiningDate: "",
      employeeId: "",
      phoneNumber: "",
      address: "",
      department: "",
    });
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    setEmployeeDetails({
      ...employeeDetails,
      joiningDate: date.toISOString().split("T")[0], // format date to YYYY-MM-DD
    });
    hideDatePicker();
  };

  const validateForm = () => {
    const fields = Object.values(employeeDetails);
    for (let field of fields) {
      if (field === "") {
        return false;
      }
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(employeeDetails.phoneNumber)) {
      Alert.alert("Error", "Phone number must be 10 digits.");
      return false;
    }
    return true;
  };

  const submitDetails = async (event) => {
    event.preventDefault();

    console.log(JSON.stringify(employeeDetails));

    if (validateForm()) {
      try {
        const url =
          "https://stock-management-system-server.onrender.com/admin/api/distribute";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeDetails),
        });
        const responseData = await response.json();
        console.log(responseData);

        if (response.ok) {
          const updatedInventory = inventory.map((inv) =>
            inv.id === selectedItem.id ? { ...inv, status: "Distributed" } : inv
          );
          setInventory(updatedInventory);
          closeModal();
        } else {
          Alert.alert("Error", responseData.message || "An error occurred");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "An error occurred");
      }
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.statusText}>{item.status}</Text>
      <TouchableOpacity
        style={styles.distributeButton}
        onPress={() => openModal(item)}
      >
        <Icon name="send" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search inventory..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredInventory}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.inventoryList}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Employee Details</Text>

            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Employee ID"
              value={employeeDetails.employeeId}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, employeeId: text })
              }
            />

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              placeholder="Department"
              value={employeeDetails.department}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, department: text })
              }
            />

            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={employeeDetails.firstName}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, firstName: text })
              }
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={employeeDetails.lastName}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, lastName: text })
              }
            />

            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={employeeDetails.gender}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setEmployeeDetails({ ...employeeDetails, gender: itemValue })
              }
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <Text style={styles.label}>Joining Date</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {employeeDetails.joiningDate || "Select Joining Date"}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={handleDatePicked}
              onCancel={hideDatePicker}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={employeeDetails.phoneNumber}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, phoneNumber: text })
              }
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Address"
              value={employeeDetails.address}
              multiline
              numberOfLines={3}
              onChangeText={(text) =>
                setEmployeeDetails({ ...employeeDetails, address: text })
              }
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitDetails}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  searchBar: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
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
  statusText: {
    fontSize: 14,
    color: "#007bff",
  },
  distributeButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#495057",
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "100%",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  datePickerButton: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: "center",
    paddingHorizontal: 8,
    width: "100%",
  },
  datePickerText: {
    color: "#000",
  },
  addressInput: {
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Distributor;
