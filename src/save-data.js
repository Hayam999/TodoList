// Factory function for nested objects
function createSubObject(value, category) {
  return {
    value,
    category,
    calculate() {
      return this.value * 3;
    },
    getInfo() {
      return `${this.category}: ${this.value}`;
    },
  };
}

// Main object factory
function createDataObject(id, name, subDataArray) {
  return {
    id,
    name,
    // Create an array of sub-objects
    subObjects: subDataArray.map((subData) =>
      createSubObject(subData.value, subData.category),
    ),
    greet() {
      return `Hello, ${this.name}!`;
    },
    calculate() {
      return this.id * 2;
    },
  };
}

const ArrayNestedStorage = {
  storageKey: "objectsWithArrays",

  // Serialize object with array of nested objects
  serialize(obj) {
    return {
      id: obj.id,
      name: obj.name,
      subObjects: obj.subObjects.map((subObj) => ({
        value: subObj.value,
        category: subObj.category,
      })),
    };
  },

  // Save objects
  save(objects) {
    const data = objects.map((obj) => this.serialize(obj));
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  },

  // Load and reconstruct objects
  load() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return data.map((item) =>
      createDataObject(item.id, item.name, item.subObjects),
    );
  },

  // Update objects
  update(updatedObjects) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const dataMap = new Map(currentData.map((item) => [item.id, item]));

    updatedObjects.forEach((obj) => {
      const serializedObj = this.serialize(obj);
      dataMap.set(obj.id, serializedObj);
    });

    const updatedData = Array.from(dataMap.values());
    localStorage.setItem(this.storageKey, JSON.stringify(updatedData));

    return updatedData.map((item) =>
      createDataObject(item.id, item.name, item.subObjects),
    );
  },

  // Update a single object
  updateOne(updatedObject) {
    return this.update([updatedObject]);
  },

  // Add a sub-object to a specific parent object's array
  addSubObject(parentId, newSubData) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetObject = currentData.find((item) => item.id === parentId);

    if (targetObject) {
      targetObject.subObjects.push({
        value: newSubData.value,
        category: newSubData.category,
      });

      return this.update([
        createDataObject(parentId, targetObject.name, targetObject.subObjects),
      ]);
    }

    return this.load();
  },

  // Remove a sub-object from a parent object's array
  removeSubObject(parentId, subObjectIndex) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetObject = currentData.find((item) => item.id === parentId);

    if (targetObject && targetObject.subObjects[subObjectIndex]) {
      targetObject.subObjects.splice(subObjectIndex, 1);

      return this.update([
        createDataObject(parentId, targetObject.name, targetObject.subObjects),
      ]);
    }

    return this.load();
  },

  // Update a specific sub-object in the array
  updateSubObject(parentId, subObjectIndex, updatedSubData) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetObject = currentData.find((item) => item.id === parentId);

    if (targetObject && targetObject.subObjects[subObjectIndex]) {
      targetObject.subObjects[subObjectIndex] = {
        value: updatedSubData.value,
        category: updatedSubData.category,
      };

      return this.update([
        createDataObject(parentId, targetObject.name, targetObject.subObjects),
      ]);
    }

    return this.load();
  },

  delete(ids) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const updatedData = currentData.filter((item) => !ids.includes(item.id));
    localStorage.setItem(this.storageKey, JSON.stringify(updatedData));

    return updatedData.map((item) =>
      createDataObject(item.id, item.name, item.subObjects),
    );
  },

  deleteOne(id) {
    return this.delete([id]);
  },

  clear() {
    localStorage.removeItem(this.storageKey);
    return [];
  },
};

// Example usage:
const objects = [
  createDataObject(1, "Alice", [
    { value: 10, category: "Premium" },
    { value: 5, category: "Standard" },
  ]),
  createDataObject(2, "Bob", [{ value: 7, category: "Basic" }]),
];

// Save initial data
ArrayNestedStorage.save(objects);

// Load and test
const loadedObjects = ArrayNestedStorage.load();
console.log(loadedObjects[0].greet()); // "Hello, Alice!"
console.log(loadedObjects[0].subObjects[0].getInfo()); // "Premium: 10"

// Add a new sub-object
ArrayNestedStorage.addSubObject(1, {
  value: 15,
  category: "VIP",
});

// Update specific sub-object
ArrayNestedStorage.updateSubObject(1, 0, {
  value: 20,
  category: "Premium Plus",
});

// Remove a sub-object
ArrayNestedStorage.removeSubObject(1, 1);
