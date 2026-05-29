<template>
  <div class="content-app">
    <div class="container">
      <div class="liquid-bg"></div>
      <div class="content">
        <h1>Página no encontrada <span class="code">404</span></h1>
        <p>La página que buscas no existe.</p>
      </div>
    </div>
  </div>

</template>

<script setup>
// No logic needed for this minimal 404 page
</script>

<style scoped>
.content-app {
  display: flex;
  justify-content: center;
  /* Centrado horizontal */
  align-items: center;
  /* Centrado vertical */
}


.container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;


  overflow: hidden;
}

.liquid-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%);
  border-radius: 45% 55% 60% 40% / 55% 45% 60% 40%;
  transform: translate(-50%, -50%) scale(1.2);
  filter: blur(60px) opacity(0.7);
  animation: liquidMove 8s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes liquidMove {
  0% {
    border-radius: 45% 55% 60% 40% / 55% 45% 60% 40%;
    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
  }

  100% {
    border-radius: 55% 45% 40% 60% / 45% 55% 40% 60%;
    transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
  }
}

.content {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.85);
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(33, 147, 176, 0.08);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2193b0;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.code {
  font-size: 2.5rem;
  color: #6dd5ed;
  font-weight: 900;
  margin-left: 0.5rem;
}

p {
  color: #444;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
</style>
