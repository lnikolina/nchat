<!-- comment -->

<template>


  <div class="view login" v-if=" state.username === '' || state.username === null">
		<!-- gornji kod nam omogucuje da pokazemo log form ukoliko je polje null ili empty -->

    <form class="login-form" @submit.prevent="Login"> <!-- v-on je direktiva za sync, .prevent zaustavlja stranicu da refresha -->
		<div class="form-inner">
				<h1>Welcome!  Login to nchat</h1>
			<label for="username">Username</label>
			<input 
				type="text" 
				v-model="inputUsername" 
				placeholder="Enter your username..."/>
			<input 
				type="submit" 
				value="login"/>
		</div>
    </form>
  </div>


  <div class="view chat" v-else> <!-- view chat ce se prikazati ako se dogodi v-if -->
	<header>

		<!-- *********** navbar ************ -->
		<div class="topnav">
			<a class="active" href="src/App.vue">Home</a>
			<a href="public/contact.html">Contact</a>
			<a href="public/about.vue">About</a>
			<button class="logout" @click="Logout">Logout</button>
		</div>

		<h1>Welcome, {{ state.username }}</h1> <!-- prikaz nasg imena: welcome nikolina -->
	</header>

	<section class="chat-box"> <!--prikaz upisane poruke na ekranu -->
      <div 
        v-for="message in state.messages" 
        :key="message.key" 
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

	<footer>
		<form @submit.prevent="SendMessage"> <!-- senda poruke -->
			<input 
				type="text" 
				v-model="inputMessage" 
				placeholder="write a message..."/>
			<input 
				type="submit" 
				value="send"/>

		</form>

	</footer>
  </div>
</template>

<script>
import { reactive, onUnmounted, ref, onMounted } from 'vue' //reactive i on-Mounted - koristi se za unos varijable, one su reagiraju na podatke
import db from './db'; 

export default {
setup () {
		const inputUsername = ref(""); // allow us to use it inside of my template
				// inputusername means our form
		const inputMessage = ref("");


		const state = reactive(
			{
				username: "", // our state username means we arw logged in
				messages: [] //stored on local state
			});


		const Login = () => {
			if (inputUsername.value != "" || inputUsername.value != null) { // checking if its not empty or its not equal to null
				state.username = inputUsername.value;
				inputUsername.value = ""; // nakon log ina, ako nesto krene po zlu vracamo se nazad
			}
		}

		const Logout = () => {
			state.username = "";

		}


		const SendMessage = () => {
			const messagesRef = db.database().ref("messages"); //na ovom dijelu stvaram poveznicu s podacima za realtime database u firebaseu
			
			if (inputMessage.value === "" || inputMessage.value === null) {
				return;
			}
			const message = {// poruka koju
				username: state.username,
				content: inputMessage.value
			}
			messagesRef.push(message); // pushamo u live database u firebaseu
			inputMessage.value = ""; 
		}
		onMounted(() => {
      const messagesRef = db.database().ref("messages");
      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });
        state.messages = messages;
      });
    });
		

		return {
			inputUsername,
			Login,
			state,
			inputMessage,
			SendMessage,
			Logout
		}
}
}
</script>




<!-- ****************************** CSS ****************************** -->
<style lang="scss">
	h1 {
		text-align: center;
	}
 * {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	position: sticky;
	
}
.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ea526f;
	
	&.login {
		align-items: center;
		.login-form {
			display: block;
			width: 100%;
			padding: 15px;
			
			.form-inner {
				display: block;
				background-color: #FFF;
				padding: 100px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
				
				h1 {
					color: #AAA;
					font-size: 28px;
					margin-bottom: 50px;
					text-align: center;
				}
				label {
					display: block;
					margin-bottom: 5px;
					color: #AAA;
					font-size: 16px;
					transition: 0.4s;
				}
				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;
					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					background-color: #ea526f;
					border-radius: 8px;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
				&:focus-within {
					label {
						color: #ea526f;
					}
					input[type="text"] {
						background-color: #FFF;
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
						&::placeholder {
							color: #666;
						}
					}
				}
			}
		}
	}
	&.chat {
		flex-direction: column;
		header {
			position: relative;
			display: block;
			width: auto;
			padding: 10px;
		
			
			.logout {
				text-align: right;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: #FFF;
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}
			h1 {
				color: #FFF;
			}
		}
		.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: #FFF;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;
			
			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: #888;
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}
					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #F3F3F3;
						border-radius: 999px;
						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}
				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;
					.message-inner {
						max-width: 75%;
						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #ea526f;
						}
					}
				}
			}
		}
		footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding:30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			form {
				display: flex;
				input[type="text"] {
					flex: 1 1 100%;
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;
					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;
					background-color: #ea526f;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
}

/* ********************** top navbar  ********************** */

	/* Add a black background color to the top navigation */
.topnav {

  background-color: #ea526f;
  overflow: hidden;
  margin: auto;
  display: flex;
  height: auto;
  width: auto;
  justify-content: space-between;

}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 5px 7px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: aaa;
  color: white;
}

</style>
