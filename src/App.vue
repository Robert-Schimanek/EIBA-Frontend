<script>
</script>
<template>
<header>
    <div id="nav" class="nav_bar">
    <router-link to="/"><button class="nav_button">Home</button></router-link>
    <router-link to="/Avise"><button class="nav_button">Avise</button></router-link>
    <router-link to="/selection"><button class="nav_button">Selection</button></router-link>
    <router-link to="/selectionII"><button class="nav_button">SelectionII</button></router-link>
    <router-link to="/Goodsin"><button class="nav_button">Goods in</button></router-link>
    <router-link to="/Boxes"><button class="nav_button">Boxes</button></router-link>
    <router-link to="/Goodsout"><button class="nav_button">Goods out</button></router-link>
  </div>
</header>

  <div class="container">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container {
  width: 900px;
  border: 1px solid black;
  margin: auto;

}
.nav_button{
  background-color: #d4d4d4;
  width: 14%;
  height: 80px;
  font-size: large;
  font-weight: 700;
  border: 0;
  border-radius: 10px 10px 0px 0px;
  margin-left: 15px;
}
.nav_button:hover {
  background-color: #a9b9b2;
}
.nav_button:checked{
  background-color: beige;
}

.nav_bar{

 /**     display:table; */
      border: 1px solid black;
}
</style>
