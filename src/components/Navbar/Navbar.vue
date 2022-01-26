<template>
    <nav class="navbar">
        <img src="@/assets/bite.png" alt="Logo" class="logo"/>
        <div tabindex="0" class="navbar-menu">
            <svg class="menu-svg" width="34" height="23" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.525 3.56189H2.975C2.26844 3.56189 1.7 4.08681 1.7 4.73927V9.84126H0.425C0.19125 9.84126 0 10.0179 0 10.2337V12.5885C0 12.8043 0.19125 12.9809 0.425 12.9809H1.7V18.0829C1.7 18.7354 2.26844 19.2603 2.975 19.2603H5.525C6.23156 19.2603 6.8 18.7354 6.8 18.0829V4.73927C6.8 4.08681 6.23156 3.56189 5.525 3.56189ZM33.575 9.84126H32.3V4.73927C32.3 4.08681 31.7316 3.56189 31.025 3.56189H28.475C27.7684 3.56189 27.2 4.08681 27.2 4.73927V18.0829C27.2 18.7354 27.7684 19.2603 28.475 19.2603H31.025C31.7316 19.2603 32.3 18.7354 32.3 18.0829V12.9809H33.575C33.8088 12.9809 34 12.8043 34 12.5885V10.2337C34 10.0179 33.8088 9.84126 33.575 9.84126ZM24.225 0.422211H21.675C20.9684 0.422211 20.4 0.947126 20.4 1.59959V9.84126H13.6V1.59959C13.6 0.947126 13.0316 0.422211 12.325 0.422211H9.775C9.06844 0.422211 8.5 0.947126 8.5 1.59959V21.2226C8.5 21.8751 9.06844 22.4 9.775 22.4H12.325C13.0316 22.4 13.6 21.8751 13.6 21.2226V12.9809H20.4V21.2226C20.4 21.8751 20.9684 22.4 21.675 22.4H24.225C24.9316 22.4 25.5 21.8751 25.5 21.2226V1.59959C25.5 0.947126 24.9316 0.422211 24.225 0.422211Z"/>
            </svg>
            <h5 class="">Workout</h5>
        </div>
        <div tabindex="0" class="navbar-menu">
            <svg class="menu-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 22V6H22V13.543C22 17.65 16 16 16 16C16 16 17.518 22 13.362 22H6ZM24 14.386V4H4V24H14.189C17.352 24 24 16.777 24 14.386ZM14 16H9V15H14V16ZM19 12H9V13H19V12ZM19 9H9V10H19V9ZM21 2H2V21H0V0H21V2Z"/>
            </svg>
            <h5 class="">Exercise List</h5>
        </div>
        <div tabindex="0" class="navbar-menu">
            <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.411 14.836l1.078-6.565 1.1 4.726c.109.484.782.539.965.072l.997-2.548.573 1.165s.187.314.498.314h1.378v-1h-1.05l-.956-2.012c-.179-.415-.771-.406-.936.016l-.845 2.16-1.303-5.769c-.059-.265-.275-.395-.49-.395-.229 0-.457.145-.502.425l-1.081 6.665-1.105-4.104c-.123-.49-.814-.519-.972-.032l-.821 3.046h-.939v.984h1.337c.183 0 .381-.147.433-.323l.466-1.506 1.187 4.723c.133.533.9.498.988-.042zm19.589 2.75l-2.831-2.832c.522-.79.831-1.735.831-2.754 0-2.761-2.238-5-5-5s-5 2.239-5 5 2.238 5 5 5c1.019 0 1.964-.309 2.755-.832l2.831 2.832 1.414-1.414zm-10-5.586c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z"/>
            </svg>
            <h5 class="">Analytics</h5>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .navbar{
        display:flex;
        align-items:center;
        background:var(--bg-first-level);
        color:var(--white);
        font-family:var(--main-font);
        position:absolute;
    }
    .logo{
        height:2vw;
    }
    .navbar-menu{
        display:flex;
        align-items: center;
        margin:0 1vw;
        cursor:pointer;
        transition:color 0.3s ease-in-out, fill 0.3s ease-in-out;
    }
    .navbar-menu:hover{
        color:var(--secondary-color);
    }
    .navbar-menu:hover > .menu-svg{
        fill:var(--white);
    }
    .navbar-menu > h5{
        font-size:var(--font-size-base);
        font-weight:600;
        margin:0;
    }
    .menu-svg{
        fill:var(--main-color);
        width:15%;
        margin:0 0.5vw;
    }
</style>
