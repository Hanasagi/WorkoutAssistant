<template src="./Home.html">
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      timer:null,
      program:[],
      superset:false,
      addExercise:false,
      edit:false,
      editIndex:0,
      currentExerciseObject:null,
      currentExercise:0,
      restTimer:false,
      soundDisabled:false,
      restTime:"",
      finalRestTime:"",
      currentTime:0
    }
  },
  mounted(){
    this.checkStorageRestTimeValidity();
  if(localStorage.getItem("program")!==null){
      this.program=JSON.parse(localStorage.getItem("program"));
      this.currentExerciseObject=this.program[this.currentExercise];
      let checkWorkoutList=setInterval(()=>{
        if(document.querySelector(".workout-list div")!==null){
          let el=this.$refs.exerciseList;
          el.children[this.currentExercise].style.outline="2px solid #35605A";
          clearInterval(checkWorkoutList);
        }
      },100)
    }else{
      this.program=[]
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
      let seconds=this.$refs.seconds;
      let minutes=this.$refs.minutes;
      let hours=this.$refs.hours;
      let ms=this.$refs.ms;

      if(e.target.getAttribute("data-event")==="start"){ 
 
        if(this.program.length!==0 || this.program!==null){
          
          if(parseInt(this.currentExerciseObject['setsNumber'])<=0 && this.currentExercise<this.program.length){
            let el=this.$refs.exerciseList;
            el.children[this.currentExercise].style.outline="none";
            console.log(this.currentExercise<this.program.length)
              this.currentExercise++;
            console.log(this.currentExercise,this.program.length)
            if(!(this.currentExercise>=this.program.length)){
               this.currentExerciseObject=this.program[this.currentExercise];
            console.log(el.children)
            console.log(this.currentExercise)
            el.children[this.currentExercise].style.outline="2px solid #35605A";
            this.currentExerciseObject['setsNumber']=parseInt(this.currentExerciseObject['setsNumber'])-1+''
            }
           
            
          }else if(parseInt(this.currentExerciseObject['setsNumber'])>0){
            console.log(this.currentExercise);
            this.currentExerciseObject['setsNumber']=parseInt(this.currentExerciseObject['setsNumber'])-1+''
          }
        }
       

        e.target.innerText="stop timer"
        e.target.setAttribute("data-event","stop");

        if(this.restTimer && this.restTime!==""){
        this.finalRestTime=(this.currentTime+parseInt(this.restTime)*100);
              if(this.finalRestTime.toString().includes("60")){
                let finalRestTime=this.finalRestTime.toString();
              let minutesIndex=parseInt(finalRestTime.indexOf("60")-1)   
              finalRestTime=finalRestTime.replace("60","00")
              finalRestTime=finalRestTime.substring(0,minutesIndex)+(parseInt(finalRestTime[minutesIndex])+1)+finalRestTime.substring(minutesIndex+1)
              this.finalRestTime=parseInt(finalRestTime);
            }
      }

        this.timer = setInterval(()=>{
          if(this.restTimer && this.restTime!==""){
            this.checkRestTime(minutes.innerText,seconds.innerText,ms.innerText);
          }
        
        let nextMS=parseInt(ms.innerText)+1;
        if(nextMS===100){
          nextMS=0;
            let nextSecond=parseInt(seconds.innerText)+1;
            if(nextSecond===60){
              nextSecond=0;
              let nextMinutes=parseInt(minutes.innerText)+1;
              nextMinutes<10?minutes.innerText="0"+nextMinutes:minutes.innerText=nextMinutes;
              if(nextMinutes===60){
                nextMinutes=0;
                let nextHours=parseInt(hours.innerText)+1;
                nextHours<10?hours.innerText="0"+nextHours:hours.innerText=nextHours;
              }
            }
          nextSecond<10?seconds.innerText="0"+nextSecond:seconds.innerText=nextSecond;
        }
        if(nextMS<10){ ms.innerText="0"+nextMS;}
        else { ms.innerText=nextMS; }
      },10)
      }else{
        e.target.innerText="start timer"
        e.target.setAttribute("data-event","start");
        window.clearInterval(this.timer);
        let time= document.createElement("p");
        this.currentTime=parseInt(minutes.innerText+seconds.innerText+ms.innerText);
        time.innerText=hours.innerText+":"+minutes.innerText+":"+seconds.innerText+"."+ms.innerText
        this.$refs.previousTimerList.append(time);
      }
    },
    resetTimer(){
      let seconds=this.$refs.seconds;
      let minutes=this.$refs.minutes;
      let hours=this.$refs.hours;
      let ms=this.$refs.ms;
      if(this.$refs.startTimer.getAttribute("data-event")==="stop"){
        this.$refs.startTimer.click();
      }
      if(this.restTimer)
        clearInterval(this.timer);

      seconds.innerText="00";
      minutes.innerText="00";
      hours.innerText="00";
      ms.innerText="00";
      this.currentTime=0;
      while(this.$refs.previousTimerList.firstChild) this.$refs.previousTimerList.removeChild(this.$refs.previousTimerList.lastChild)
    },
    addSuperset(e){
      e.preventDefault();
      e.stopPropagation();
      if(this.superset===false){
        this.superset=true;
        e.target.innerText="REMOVE SUPERSET EXERCISE"
      }else{
        this.superset=false;
        e.target.innerText="ADD SUPERSET EXERCISE"
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
      }
      if(!this.edit){
        this.program.push(exercise)
      }else{
        this.program[this.editIndex]=exercise;
        this.edit=false;
      }
      if(this.program.length===0){
         
        let checkEl= setInterval(()=>{
            let el=this.$refs.exerciseList;
            if(el!==null){
              el.children[this.currentExercise].style.outline="2px solid #35605A";
            this.currentExerciseObject=this.program[this.currentExercise];
            clearInterval(checkEl);
            }
                     },100)
        
      }
      console.log(this.currentExerciseObject)
      localStorage.setItem("program",JSON.stringify(this.program))
      this.openComponent(false);
    },
    openComponent(bool){
      if(!bool) {this.superset=false}
      if(this.edit) this.edit=false;
      this.addExercise=bool;
    },
    removeItem(e){
      let index=e.target.parentNode.getAttribute("data-index");
      this.program.splice(index,1);
      if(this.program.length===0){
        localStorage.removeItem("program");
      }else{
        localStorage.setItem("program",JSON.stringify(this.program));
      }
    },
    editItem(e){
      let index=e.target.parentNode.getAttribute("data-index");
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

      this.$refs.restTimeMinute.placeholder=""
      this.$refs.restTimeSeconds.placeholder=""
      if(e.target.getAttribute("data-time")==="minutes"){
        restTime=""
        if(this.$refs.restTimeSeconds.value==="" && e.target.value!==""){
          restTime=parseInt(e.target.value)*100+'';
        }else{
          restTime=e.target.value+":"+this.$refs.restTimeSeconds.value;
        }
      }else{
        if(this.$refs.restTimeMinute.value===""){
          restTime=":"+e.target.value;
        }else{
          if(e.target.value==""){
            restTime=parseInt(this.$refs.restTimeMinute.value*100)+":"+e.target.value;
          }else{
            restTime=this.$refs.restTimeMinute.value+":"+e.target.value;
          }
          
        }
      }

      restTime=restTime.split(":")
      if(restTime[1]===undefined) restTime[1]=""
      this.restTime=restTime[0]+restTime[1];
      this.$refs.restTimeMinute.placeholder=restTime[0]
      restTime[1]===undefined?this.$refs.restTimeSeconds.placeholder="":this.$refs.restTimeSeconds.placeholder=restTime[1];
      localStorage.setItem("restTime",restTime[0]+":"+restTime[1]);
    },
    checkRestTime(minutes,seconds,ms){
      let time=parseInt(minutes+seconds+ms);
      if(time===this.finalRestTime){
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
        restTime=restTime.split(":")
        if(restTime[0]!=''){
          this.restTime=restTime[0]
          if(parseInt(restTime[0])>100)
            restTime[0]=(parseInt(restTime[0])/100)+''
          this.$refs.restTimeMinute.placeholder=restTime[0];
        }
        if(restTime[1]!=undefined){
          this.restTime+=restTime[1]
          this.$refs.restTimeSeconds.placeholder=restTime[1];
        }
        this.restTimer=true;
        if(localStorage.getItem("soundDisabled")!==null) {
          this.soundDisabled=JSON.parse(localStorage.getItem("soundDisabled"));
        }
        this.$refs.setTimer.click(); 
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
  @import './Home.css'
</style>
