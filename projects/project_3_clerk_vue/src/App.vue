<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
      <SignedOut>
        <SignInButton class="signin-button animate-button" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <p>&copy; 2024 Our Platform. All rights reserved.</p>
      </div>
      <div class="footer-section">
        <router-link to="/privacy" class="footer-link"
          >Privacy Policy</router-link
        >
        <router-link to="/terms" class="footer-link"
          >Terms of Service</router-link
        >
        <router-link to="/support" class="footer-link">Support</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  animation: slideDown 0.5s ease-out;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  height: 40px;
  width: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #1d1d1f;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #0071e3;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
  padding: 100px 0;
  margin-bottom: 80px;
}

.content {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
}

.animate-text {
  font-size: 2.5rem;
  color: #1d1d1f;
  margin-bottom: 1rem;
  font-weight: 600;
  opacity: 0;
  animation: fadeUp 0.8s ease-out forwards;
}

.animate-text-delay {
  color: #86868b;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.3s forwards;
}

.signin-button {
  background-color: #00a763;
  color: white;
  border: none;
  padding: 0.7rem 1.1rem;
  border-radius: 980px;
  font-size: 0.8rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.6s forwards;
}

.signin-button:hover {
  background-color: #0077ed;
  transform: scale(1.02);
}

.footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  animation: slideUp 0.5s ease-out;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-section {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: #86868b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #0071e3;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .nav-content,
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .nav-links,
  .footer-section {
    gap: 1rem;
  }

  .content {
    padding: 1.5rem;
  }

  .animate-text {
    font-size: 2rem;
  }

  .animate-text-delay {
    font-size: 1rem;
  }
}
</style>
