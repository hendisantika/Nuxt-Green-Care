<template>
  <div class="container">
    <h1>Top Page</h1>

    <!-- Add form -->
    <form>
      <div class="mb-3">
        <label class="form-label" for="exampleInputName1">Name</label>
        <input
            v-model="plant"
            type="text"
            id="exampleInputName1"
            aria-describedby="nameHelp"
            class="form-control"
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
          <button class="btn btn-warning btn-sm" type="button">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" type="button">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const plants = ref(null);
const plant = ref(null); //追加
plants.value = await getPlants();

// Get plants
async function getPlants() {
  return await $fetch("/api/plants");
}

// Add plants
async function addPlant(plant) { //追加

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
