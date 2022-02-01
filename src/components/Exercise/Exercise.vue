<template>
    <main class="exercise-wrapper">
        <div v-if="loading" class="loading"></div>
        <div v-else class="grid">
            <div class="grid-a">
                <input type="text" class="search-exercise" @input="searchExercise">
                <div class="exercise-list-wrapper">
                    <div v-for="index in 20" :key="index" class="exercise-item" :data-index="index" @click="getExerciseInfo">
                        <h2 class="exercise-name">{{exerciseList[index].name}}</h2>
                        <h3 class="exercise-equipment">Equipment needed: <span>{{exerciseList[index].equipment}}</span></h3>
                        <h3 class="exercise-equipment">Target: <span>{{exerciseList[index].bodyPart}}</span></h3>
                    </div>
                </div>
            </div>
            <div class="grid-b">
                <div v-if="!currentExercise"  class="no-exercise-selected"><p>Click on an exercise</p></div>
                <div v-else class="exercise-item-info">
                    <h1>{{currentExercise.name}}</h1>
                    <h2 class="exercise-item-info-text">Target: <span>{{currentExercise.target}}</span></h2>
                    <h2 class="exercise-item-info-text">Equipment needed: <span>{{currentExercise.equipment}}</span></h2>
                    <img :src="currentExercise.gifUrl" alt="exercise example gif">
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  name: 'Exercise',
  data(){
      return{
          loading:true,
          exerciseList:null,
          currentExercise:null,
          exerciseClicked:false
      }
  },
  mounted(){
      this.exerciseList=JSON.parse(localStorage.getItem("exercisedb"));
      this.loading=false;
  },
  methods:{
      getExerciseInfo(e){
          this.currentExercise=this.exerciseList[e.target.getAttribute("data-index")];
      },
      searchExercise(e){
             let value = e.target.value

            if (value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                //returning only the results of setList if the value of the search is included in the person's name
                this.setList(this.exerciseList.filter(exercise => {
                    return exercise.name.includes(value)
                }))
            }
      },
      setList(r){
          console.log(r);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Exercise.css';
</style>
