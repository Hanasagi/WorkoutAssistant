<template src="./Home.html">
</template>

<script>
import Navbar from "../Navbar/Navbar";
import {callAPI} from "../ExerciseDBCall.js";

export default {
  name: 'Home',
  components:{
    Navbar
  },
  data(){
    return{
      timer:null,
      program:[],
      superset:false,
      triset:false,
      addExercise:false,
      edit:false,
      editIndex:0,
      currentExerciseObject:null,
      currentExercise:0,
      restTimer:false,
      soundDisabled:false,
      restTime:"",
      finalRestTime:"",
      lap:0,
    }
  },
  mounted(){
    callAPI();
    this.checkStorageRestTimeValidity();
    let baseTime=0;
    for(let i=0;i<10;i++){
      baseTime+=30000;
      let toTime=this.intToTime(baseTime);
      let p=document.createElement("p");
      console.log(toTime,this.restTime,toTime.substring(toTime.indexOf(":")+1)===this.restTime)
      if(toTime===this.restTime){
        p.classList.add("current")
      }
      p.innerText=`${toTime.substring(toTime.indexOf(":")+1,toTime.indexOf("."))}`;
      p.addEventListener("click",(e)=>{
        console.log(e.target.parentNode);
        e.target.parentNode.classList.remove("rest-display-block");
        e.target.parentNode.classList.add("rest-display-none");
        e.target.parentNode.parentNode.cssText="pointer-events:initial;";
        console.log(e.target.parentNode);
        this.restTime="00:"+e.target.innerText+".00";
        localStorage.restTime=this.restTime;
         let current=document.querySelector(".current");
          current.classList.remove("current");
          e.target.classList.add("current");
      })
      this.$refs.restTimeList.append(p);
    }
  this.$refs.changeRestTime.addEventListener("click",(e)=>{
    e.target.style.cssText="pointer-events:none;";
    this.$refs.restTimeList.classList.remove("rest-display-none");
    this.$refs.restTimeList.classList.add("rest-display-block");
    
  })

  if(localStorage.getItem("program")!==null){
      this.program=JSON.parse(localStorage.getItem("program"));
      if(this.program.length!==0){
        this.currentExerciseObject=this.program[this.currentExercise];
      let checkWorkoutList=setInterval(()=>{
        if(document.querySelector(".workout-list div")!==null){
          let el=this.$refs.exerciseList;
          el.children[this.currentExercise].style.outline="2px solid #35605A";
          clearInterval(checkWorkoutList);
        }
      },100)
    }
    }else{
      this.program=[]
      console.log(this.restTimer)
    }

    
    //this.$refs.exerciseList.children[this.currentExercise].style.outline="2px solid #35605A";
    document.addEventListener("keypress",(e)=>{
      if(e.code==="Space" && !this.addExercise){
        this.$refs.startTimer.click();
      }
    })

  },
  methods:{
    startTimer(e){
      if(e.target.getAttribute("data-event")==="start"){ 
        let startTime= Date.now()-this.lap;
        if(this.program.length!==0){
          
          if(parseInt(this.currentExerciseObject['setsNumber'])<=0 && this.currentExercise<this.program.length){
            let el=this.$refs.exerciseList;
            el.children[this.currentExercise].style.outline="none";
              this.currentExercise++;
            if(!(this.currentExercise>=this.program.length)){
               this.currentExerciseObject=this.program[this.currentExercise];
            el.children[this.currentExercise].style.outline="2px solid #35605A";
            this.currentExerciseObject['setsNumber']=parseInt(this.currentExerciseObject['setsNumber'])-1+''
            }
           
            
          }else if(parseInt(this.currentExerciseObject['setsNumber'])>0){
            this.currentExerciseObject['setsNumber']=parseInt(this.currentExerciseObject['setsNumber'])-1+''
          }
        }
       

        e.target.innerText="stop"
        e.target.setAttribute("data-event","stop");

        if(this.restTimer && this.restTime!==""){
        this.finalRestTime=this.lap+(this.restTime.split(':').reduce (function (seconds, v) {    
                return +v + seconds * 60;
              }, 0) / 60 * 1000);      
          }
      console.log(this.finalRestTime)
        this.timer = setInterval(()=>{
          if(this.restTimer && this.restTime!==""){
            this.checkRestTime(this.lap);
          }
        
        this.lap=Date.now()-startTime;
        this.$refs.stopwatch.innerText=this.intToTime(this.lap);
      },10)
      }else{
        e.target.innerText="start"
        e.target.setAttribute("data-event","start");
        window.clearInterval(this.timer);
        let time= document.createElement("p");
        time.innerText=this.intToTime(this.lap);
        this.$refs.lapList.append(time);
      }
    },
    intToTime(time){
      let hourDiff=time/3600000;
      let h=Math.floor(hourDiff);
      let minDiff=(hourDiff-h)*60;
      let m=Math.floor(minDiff);
      let secDiff=(minDiff-m)*60;
      let s=Math.floor(secDiff);
      let msDiff=(secDiff-s)*100;
      let ms=Math.floor(msDiff);

      let stringH=h.toString().padStart(2, '0');
      let stringM=m.toString().padStart(2, '0');
      let stringS=s.toString().padStart(2, '0');
      let stringMS=ms.toString().padStart(2, '0');

      return `${stringH}:${stringM}:${stringS}.${stringMS}`;
    },
    resetTimer(){
      this.$refs.stopwatch.innerText="00:00:00.00"
      if(this.$refs.startTimer.getAttribute("data-event")==="stop"){
        this.$refs.startTimer.click();
      }
      if(this.restTimer)
        clearInterval(this.timer);
      this.lap=0;
      while(this.$refs.lapList.firstChild) this.$refs.lapList.removeChild(this.$refs.lapList.lastChild)
    },
    addSuperset(e){
      e.preventDefault();
      e.stopPropagation();
      if(this.superset===false){
        this.superset=true;
        e.target.innerText="REMOVE SUPERSET EXERCISE"
      }else{
        this.superset=false;
        if(this.triset)
          this.triset=false;
        e.target.innerText="ADD SUPERSET EXERCISE"
      }
      
    },
    addTriset(e){
      e.preventDefault();
      e.stopPropagation();
      if(this.triset===false){
        this.triset=true;
        e.target.innerText="REMOVE TRISET EXERCISE"
      }else{
        this.triset=false;
        e.target.innerText="ADD TRISET EXERCISE"
      }
    },
    saveExercise(e){
      e.stopPropagation();
      e.preventDefault();
      let exercise={}
      exercise['exerciseName']=e.srcElement[0].value;
      exercise['repsNumber'] = e.srcElement[1].value;
      exercise['setsNumber'] = e.srcElement[2].value;
      if(this.superset){
        exercise['supersetExerciseName']=e.srcElement[4].value;
        exercise['supersetRepsNumber']=e.srcElement[5].value;
        if(this.triset){
          exercise['trisetExerciseName']=e.srcElement[7].value;
        exercise['trisetRepsNumber']=e.srcElement[8].value;
        }
      }
      if(!this.edit){
        let previousLength=this.program.length
        this.program.push(exercise);
        if(previousLength===0){
          this.checkStorageRestTimeValidity(); 
        let checkEl= setInterval(()=>{
            let el=this.$refs.exerciseList;
            if(el!==null){
    
              el.children[this.currentExercise].style.outline="2px solid #35605A";
            this.currentExerciseObject=this.program[this.currentExercise];
            clearInterval(checkEl);
            }
                     },100)
        
      }
      }else{

        this.program[this.editIndex]=exercise;
        this.edit=false;
      }
      localStorage.setItem("program",JSON.stringify(this.program))
      this.openComponent(false);
    },
    openComponent(bool){
      if(!bool) {this.superset=false;this.triset=false;document.body.style.overflow="visible";}
      else{document.body.style.overflow="hidden";}
      if(this.edit) this.edit=false;
      this.addExercise=bool;
    },
    removeItem(e){
      let index=e.target.parentNode.parentNode.getAttribute("data-index");
      this.program.splice(index,1);
      if(this.program.length===0){
        localStorage.removeItem("program");
      }else{
        localStorage.setItem("program",JSON.stringify(this.program));
      }
    },
    editItem(e){
      document.body.style.overflow="hidden";
      let index=e.target.parentNode.parentNode.getAttribute("data-index");
      this.editIndex=parseInt(index);
      this.edit=true;
      this.addExercise=true;
      let checkInputPresence = setInterval(()=>{
        let exerciseName=document.querySelector("input[name='normal-exercise']");
        
        if(exerciseName!==null){
          let normalReps=document.querySelector("input[name='normal-reps']");
          let normalSets=document.querySelector("input[name='normal-sets']");
          exerciseName.value=this.program[index]['exerciseName'];
          normalReps.value=this.program[index]['repsNumber'];
          normalSets.value=this.program[index]['setsNumber'];
          if(this.program[index]['supersetExerciseName']!==undefined){
            this.superset=true;
            let addSupersetButton=document.querySelector("div.superset > button")
            addSupersetButton.innerText="REMOVE SUPERSET EXERCISE"
            let checkSupersetInputPresence=setInterval(()=>{
              let supersetExerciseName=document.querySelector("input[name='superset-exercise']");
              if(supersetExerciseName!==null){
                let supersetNormalReps=document.querySelector("input[name='superset-reps']");
                supersetExerciseName.value=this.program[index]['supersetExerciseName'];
                supersetNormalReps.value=this.program[index]['supersetRepsNumber'];
                clearInterval(checkSupersetInputPresence);
              }
            },100)
          }
          clearInterval(checkInputPresence);
        }
      },100);
      
    },
    setRestTimer(e){
      if(!e.target.checked){
        this.restTimer=false;
        for(let el of e.target.parentNode.children){
        if(el.localName=="input" && el.type!=="checkbox" && el.disabled===false){
          el.disabled=true;
          }
        }
       e.target.parentNode.parentNode.children[1].children[0].disabled=true;
      }else{
        this.restTimer=true;
        for(let el of e.target.parentNode.children){
        if(el.localName=="input" && el.disabled===true){
          el.disabled=false;
          }
        }
        if(!this.soundDisabled){
          e.target.parentNode.parentNode.children[1].children[0].checked=true;
        }
        e.target.parentNode.parentNode.children[1].children[0].disabled=false;
      }
      
    },
    setRestTime(e){
      if(!this.checkIfTextIsNumber(e.target.value) && e.target.value.length!==0) return;
      let restTime;

      this.$refs.restTime.innerText=""
      if(e.target.getAttribute("data-time")==="minutes"){
        restTime=""
        if(this.$refs.restTimeSeconds.value==="" && e.target.value!==""){
          restTime=e.target.value.padStart(2,'0')+':00';
        }else{
          restTime=e.target.value.padStart(2,'0')+":"+this.$refs.restTimeSeconds.value.padStart(2,'0');
        }
      }else{
        if(this.$refs.restTimeMinute.value===""){
          restTime="00:"+e.target.value.padStart(2,'0');
        }else{
          if(e.target.value==""){
            restTime=this.$refs.restTimeMinute.value.padStart(2,'0')+":"+e.target.value.padStart(2,'0');
          }else{
            restTime=this.$refs.restTimeMinute.value.padStart(2,'0')+":"+e.target.value.padStart(2,'0');
          }
          
        }
      }
      console.log(restTime)
      restTime+=".00"
      let split_restTime=restTime.split(":")
      this.restTime=restTime;
      this.$refs.restTimeMinute.placeholder=split_restTime[0]
      this.$refs.restTimeSeconds.placeholder=split_restTime[1];
      localStorage.setItem("restTime",restTime);
    },
    checkRestTime(lap){
      if(lap>=this.finalRestTime && lap<=this.finalRestTime+10){
        if(!this.soundDisabled){
          let audio = new Audio(require("@/assets/mixkit-simple-game-countdown-921.mp3"));
          audio.play();
        }
        this.$refs.startTimer.click();
      }
    },
    checkStorageRestTimeValidity(){
        if(localStorage.getItem("restTime")!==null && localStorage.getItem("restTime")!==':'){
        let restTime=localStorage.getItem("restTime");
        this.restTime=restTime;
        restTime=restTime.substring(restTime.indexOf(":")+1,restTime.indexOf('.'));
        this.$refs.restTime.innerText=restTime;
        this.restTimer=true;
        if(localStorage.getItem("soundDisabled")!==null) {
          this.soundDisabled=JSON.parse(localStorage.getItem("soundDisabled"));
        }
      }
    },
    checkIfTextIsNumber(value){
      return value.match(/[0-9]/g)?true:false;
    },
    checkValidity(e){
      if(!this.checkIfTextIsNumber(e.target.value))
        e.target.value="";
    },
    disableSound(e){
      if(e.target.checked){
        this.soundDisabled=false;
      }else{
        this.soundDisabled=true;
        
      }
      localStorage.setItem("soundDisabled",this.soundDisabled);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import './Home.css';
</style>
