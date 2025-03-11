<template>
    <nav class="nav-bar">
      <div class="nav-links">
        <router-link to="/">Flux RSS</router-link>
        <router-link to="/add-feed">Ajouter un Flux</router-link>
        <router-link to="/favorites">Favoris</router-link>
      </div>
    </nav>
  </template>
  
  <style scoped>
  .nav-bar {
    padding: 12px 0;
    background-color: #444;
  }
  
  .nav-links {
    margin-left: 15px;
  }
  
  .nav-links > * {
    margin-left: 18px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .nav-links > *:hover {
    text-decoration: underline;
  }
  </style>
  