// ProjectMain.vue - main component

<template>
	<div id='family' class="app">
		
	</div>
</template>

<script>
	// import { mapState } from 'vuex';

	export default {
		name: 'ProjectMain',
		components: {
		},
		data() {
			return {
			}
		},
		computed: {
			// ...mapState([
			// ])
		},
		methods: {
			translate(lngId, ...args) {
				return this.$store.getters.translate(lngId, ...args);
			}
		}
	}
</script> 