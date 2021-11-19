import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import "./AboutPage.css";

function AboutPage() {
  return (
    <>
      <Typography variant="h3" className="heading">
        About the Game
      </Typography>
      <div className="content">
        <Typography variant="h4" className="heading">
          Game Rules
        </Typography>
        In this version of 5 card draw there will be no betting so keep your
        money in your pockets! The rules are very simple. Each player will be
        dealt five cards from the dealer. Based on your hand you have the option
        to keep all five cards on stay or draw one time up to three new cards to
        make your hand even better.
        <Typography variant="h5" className="heading">
          Best Hands
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="1. Royal Flush"
              secondary="10,J,Q,K,A all of the same suit"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Straight Flush"
              secondary="All 5 cards in numerical order of the same suit"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. Four of a Kind"
              secondary="4 cards matching face value"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="4. Full House"
              secondary="Any 3 cards of matching face AND any 2 cards of matching face"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="5. Flush"
              secondary="All cards of the same suit"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="6. Straight"
              secondary="All 5 cards in numerical order"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="7. Three of a kind"
              secondary="Any three cards matching face value"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="8. Two Pair"
              secondary="Two sets of two cards matching face value"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="9. One Pair"
              secondary="Two cards of matching face value"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="10. High Card"
              secondary="Highest cards if none of the others are met (1-10 then J,Q,K,A)"
            />
          </ListItem>
        </List>
      </div>
      <Typography variant="h4" className="heading">
        Creators
      </Typography>
      <div className="content">
        <Typography variant="h5" className="heading">
          Seth Allgire{" "}
          <a href="https://github.com/seth-allgire">
            <IconButton aria-label="git-hub" component="span">
              <GitHubIcon />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/in/seth-allgire-2824aa223/">
            <IconButton aria-label="linked-in" component="span">
              <LinkedInIcon />
            </IconButton>
          </a>
        </Typography>
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
      </div>
      <div className="content">
        <Typography variant="h5" className="heading">
          Colin Sand
          <a href="https://github.com/ColinSand">
            <IconButton aria-label="git-hub" component="span">
              <GitHubIcon />
            </IconButton>
          </a>
          <a href="www.linkedin.com/in/colinsand">
            <IconButton aria-label="linked-in" component="span">
              <LinkedInIcon />
            </IconButton>
          </a>
        </Typography>
        Changing careers, constantly learning. I enjoy playing and studying
        video games, and taking extended walks.
      </div>
      <div className="content">
        <Typography variant="h5" className="heading">
          Nate Kliegl
          <a href="https://github.com/NateKliegl">
            <IconButton aria-label="git-hub" component="span">
              <GitHubIcon />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/in/nate-kliegl-444599223/">
            <IconButton aria-label="linked-in" component="span">
              <LinkedInIcon />
            </IconButton>
          </a>
        </Typography>
        My hobbies are watching and playing sports, playing video games and
        hunting! But the problem solving and thought process that goes into web
        development has brought me into pursuing a career in Software
        Engineering and also making coding one of my new found hobbies.
      </div>
    </>
  );
}

export default AboutPage;
