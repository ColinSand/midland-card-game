import React from "react";

function AboutPage() {
  return (
    <div>
      <div>
        <h1>About the Game</h1>
        <h3>Game Rules</h3>
        In this version of 5 card draw there will be no betting so keep your
        money in your pockets! The rules are very simple. Each player will be
        dealt five cards from the dealer. Based on your hand you have the option
        to keep all five cards on stay or draw one time up to three new cards to
        make your hand even better.
        <h4>Best hands</h4>
        <ol>
          <li>Royal Flush</li>
          <li>Straight Flush</li>
          <li>Four of a kind</li>
          <li>Full House</li>
          <li>Flush</li>
          <li>Straight</li>
          <li>Three of a kind</li>
          <li>Two Pair</li>
          <li>One Pair</li>
          <li>High Card</li>
        </ol>
      </div>
      <h1>Creators</h1>
      <div className="aboutPage">
        <h3 className="aboutPage">Seth Allgire</h3>
        Writing code might be addictive. Empty files can be daunting, but
        filling them with working code and seeing a product that functions and
        can be used by others is absolutely thrilling. My arms still shoot into
        the air in celebration every time. Outside of coding I enjoy building
        and restoring almost anything, getting into the mountains or at least
        into a quiet forested area (Omaha’s not exactly famous for it’s
        mountains), and diving deep into conversation with friends about life
        and living well. Through everything, I get to be husband to an
        incredible woman who loves me far better than I deserve, and I get to be
        dad to two super interesting and fun kids who somehow manage to keep me
        young and turn my hair gray at the same time. Always love and always
        learn.
        <h4 className="aboutPage">Github and Linkedin</h4>
        <a href="https://github.com/seth-allgire">Visit Seth's github!</a>
        <br />
        <a href="https://www.linkedin.com/in/seth-allgire-2824aa223/">
          Visit Seth's Linkedin!
        </a>
      </div>
      <div className="aboutPage">
        <h3>Colin Sand</h3>
        Changing careers, constantly learning. I enjoy playing and studying
        video games, and taking extended walks.
        <h4 className="aboutPage">Github and Linkedin</h4>
        <a href="https://github.com/ColinSand">Visit Colin's github!</a>
        <br />
        <a href="www.linkedin.com/in/colinsand">Visit Colin's Linkedin!</a>
      </div>
      <div className="aboutPage">
        <h3 className="aboutPage">Nate Kliegl</h3>
        My hobbies are watching and playing sports, playing video games and
        hunting! But the problem solving and thought process that goes into web
        development has brought me into pursuing a career in Software
        Engineering and also making coding one of my new found hobbies.
        <h4>Github and Linkedin</h4>
        <a href="https://github.com/NateKliegl">Visit Nate's github!</a>
        <br />
        <a href="https://www.linkedin.com/in/nate-kliegl-444599223/">
          Visit Nate's Linkedin!
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
