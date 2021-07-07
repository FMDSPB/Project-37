class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz

    /*let title = createElement('h1');
    title.html("Result of the Quiz");
    title.position(350, 0);*/
    text("Result of the Quiz", 350, 0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {

      //write code to add a note here
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are highlighted in green colour!", 130, 250);

      //write code to highlight contest who answered correctly
      for(let plr in allContestants) {
      //let y = 350;
      let correctAns = "2";

      if(correctAns === allContestants[plr].answer) {

       fill("green");
       text(allContestants[plr].name + ":" +allContestants[plr].answer, 300, 350);
       //y += 20;

      }
       
      else {

       fill("red");
       text(allContestants[plr].name + ":" +allContestants[plr].answer, 300, 370);

      }
       
      

      }

    }

  }

}