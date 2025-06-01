// src/fetch-helper.js

const BASE_URL = "http://localhost:3000"; 

export async function fetchDestinations() {
  return call(`/destination/list`, "GET");
}

export async function createDestination(dtoIn) {
  return call(`/destination/create`, "POST", dtoIn);
}

export async function deleteDestination(id) {
  return call(`/destination/delete?id=${id}`, "DELETE");
}

export async function createActivity(destinationId, dtoIn) {
  return call(`/destination/${destinationId}/activity/create`, "POST", dtoIn);
}

async function call(url, method, dtoIn) {
  try {
    const resp = await fetch(BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: dtoIn ? JSON.stringify(dtoIn) : undefined,
    });

    const data = await resp.json();
    return {
      ok: resp.ok,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
}
