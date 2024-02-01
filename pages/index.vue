<template>
  <div class="container">
    <h1>Top Page</h1>

    <!-- PlantsModal 追加 -->
    <div
        id="exampleModal"
        aria-hidden="true"
        aria-labelledby="exampleModalLabel"
        class="modal fade"
        tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Edit Plant</h5>
            <button
                aria-label="Close"
                class="btn-close"
                data-bs-dismiss="modal"
                type="button"
            ></button>
          </div>
          <div class="modal-body">
            <input
                id="exampleInputName1"
                v-model="editedPlant.name"
                aria-describedby="nameHelp"
                class="form-control"
                type="text"
            />
          </div>
          <div class="modal-footer">
            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                type="button"
            >
              Close
            </button>
            <button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
                @click="editPlant(editedPlant)"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="error"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
    >
      <strong>Error:</strong> Delete Error
      <button
          aria-label="Close"
          class="btn-close"
          data-bs-dismiss="alert"
          type="button"
          @click="error = null"
      ></button>
    </div>

    <form>
      <div class="mb-3">
        <label class="form-label" for="exampleInputName1">Name</label>
        <input
            v-model="plant"
            type="text"
            class="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
        />
      </div>
      <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="addPlant(plant)"
      >
        Add Name
      </button>
    </form>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(plant, index) in plants">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ plant.name }}</td>
        <td>
          <!-- 追加 -->
          <button
              class="btn btn-warning btn-sm"
              data-bs-target="#exampleModal"
              data-bs-toggle="modal"
              type="button"
              @click="
                {
                  editedPlant.id = plant.id;
                  editedPlant.name = plant.name;
                }
              "
          >
            Edit
          </button>
        </td>
        <td>
          <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deletePlant(plant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {H3Error} from "h3";

const plants = ref(null);
const plant = ref(null);
const error = ref(null);
// 追加
const editedPlant = ref({
  id: null,
  name: null,
});
plants.value = await getPlants();

// Get plants
async function getPlants() {
  return await $fetch("/api/plants");
}

// Add plant
async function addPlant(plant) {
  let addedPlant = null;
  if (plant)
    addedPlant = await $fetch("/api/plants", {
      method: "POST",
      body: {
        name: plant,
      },
    });

  if (addedPlant) plants.value = await getPlants();
}

// Edit plant 追加
async function editPlant(editedPlant) {
  let plant = null;

  if (editedPlant.id && editedPlant.name)
    plant = await $fetch("/api/plants", {
      method: "PUT",
      body: {
        id: editedPlant.id,
        name: editedPlant.name,
      },
    });

  if (plant) plants.value = await getPlants();
}

// Delete plant
async function deletePlant(id) {
  let deletePlantOrError = null;
  if (id)
    deletePlantOrError = await $fetch("/api/plants", {
      method: "DELETE",
      body: {
        id: id,
      },
    });

  if (deletePlantOrError instanceof H3Error) {
    error.value = deletePlantOrError;
    return;
  }

  plants.value = await getPlants();
}

useHead({
  title: "Green Care",
  link: {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    type: "text/css",
  },
  script: {
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  },
});
</script>
