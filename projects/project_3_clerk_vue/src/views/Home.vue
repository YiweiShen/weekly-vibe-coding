<script setup lang="ts">
import { SignedIn, SignedOut } from '@clerk/vue'
</script>

<template>
  <div>
    <SignedOut>
      <div class="login-container">
        <div class="content">
          <img src="../assets/logo.svg" alt="Logo" class="logo" />
          <h1 class="animate-text">Welcome to Our Platform</h1>
          <p class="animate-text-delay">Sign in to access your account</p>
          <p>Test phone number: +15555550100</p>
          <p>Test verification code: 424242</p>
        </div>
      </div>
    </SignedOut>
    <SignedIn>
      <div class="login-container">
        <div class="content">
          <img src="../assets/logo.svg" alt="Logo" class="logo" />
          <h1 class="animate-text">Welcome back!</h1>
          <p class="animate-text-delay">
            Explore your dashboard and make the most of your journey with us.
          </p>
        </div>
      </div>
    </SignedIn>
  </div>
</template>

<style scoped>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0071e3;
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 113, 227, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.6s forwards;
}

.signin-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 70%
  );
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
  z-index: -1;
}

.signin-button:hover::before {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.signin-button:hover {
  background-color: #005bb5;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 91, 181, 0.4);
}

.signin-button:focus {
  outline: 3px solid rgba(0, 113, 227, 0.5);
  outline-offset: 3px;
}

.signin-button:active {
  transform: scale(0.98);
  box-shadow: 0 3px 10px rgba(0, 113, 227, 0.5);
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

@media (max-width: 768px) {
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
