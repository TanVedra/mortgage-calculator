<template>
    <nav class="indigo">
      <div class="nav-wrapper container">
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">dehaze</i></a>
        <a href="/banks-management" class="brand-logo right">Mortgage Project</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><router-link to="/banks-management">Banks Management</router-link></li>
          <li><router-link to="/mortgage-calculator">Calculator</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/banks-management">Banks Management</router-link></li>
      <li><router-link to="/mortgage-calculator">Calculator</router-link></li>
    </ul>
    <router-view />
</template>

<style lang="scss"></style>
