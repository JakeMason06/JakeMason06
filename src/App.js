  import React, { useState,useEffect } from 'react'
  import {
    SingleEliminationBracket,
    Match,
    createTheme
  } from '@dustup/react-tournament-brackets'
  import './App.css'
  import tournamentObj from  './tournament.json'


  const TextBox = ({ text, show, setShow, initialPosition, boxKey }) => {
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    // Update the position when a new TextBox is shown
    useEffect(() => {
      if (show && initialPosition) {
        setPosition(initialPosition)
      }
    }, [show, initialPosition], boxKey)

    const onMouseDown = (match) => {
      setIsDragging(true)
      setOffset({ x: match.clientX - position.x, y: match.clientY - position.y })
    }
    
    const onMouseUp = () => {
      setIsDragging(false)
    }

    const onMouseMove = (match) => {
      if (isDragging) {
        setPosition({
          x: match.clientX - offset.x,
          y: match.clientY - offset.y,
        })
      }
    }

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseup", onMouseUp)
      } else {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }

      return () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }
    }, [isDragging])

    if (!show) return null

    return (
      <div
        style={{
          position: "fixed",
          top: `${position.y}px`,
          left: `${position.x}px`,
          border: "1px solid white",
          padding: "30px",
          background: "#10131C",
          color: "#F4F2FE",
          borderRadius: "8px",
        }}
        onMouseDown={onMouseDown}
      >
        <div dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}></div>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            position: "absolute",
            top: "0",
            left: "0",
            borderRadius: "8px",
            color: "#FF5555"
          }}
          onClick={() => setShow(false)}
        >
          X
        </button>
      </div>
    )
  }

  function transformData(tournamentObj) {
    return tournamentObj.matches.map(match => {
      // Calculate the state based on the status and number of teams
      let state
      if (match.teams.length < 2) {
        state = "WALK_OVER"
      } else {
        state = match.status === "complete" ? "SCORE_DONE" : "SCHEDULED"
      }
      
      // Return the transformed match object
      return {
        id: match._id,
        nextMatchId: match.next_match,
        tournamentRoundText: "1", // This property is not available in tournamentObj.matches
        startTime: "", // This property is not available in tournamentObj.matches
        state: state,
        participants: match.teams.map(team => ({
          id: team._id,
          name: team.team_name,
          resultText: null,
          isWinner: false,
          status: null,
          players: team.users.map(user => ({
            ingame: `${user.ingame_id}`
            // Add other team properties here as needed
          }))}))}})
        }

  const simpleSmallBracketObj = [
    {
      id: "64be106892bb4c5f18e8421619753",
      nextMatchId: null,
      tournamentRoundText: "3",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
          id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
          resultText: "Won",          
          isWinner: true,
          status: null,
          name: "Bitcoin",
          picture: ""
        },
        {
          id: "9397971f-4b2f-44eb-a094-722eb286c59b",
          resultText: "Lost",
          status: null,
          name: "Bitfury",
          isWinner: false,
          picture: ""
        },
      ]
      },
      {
        id: "64be106892bb4c5f18e8421619754",
        nextMatchId: "64be106892bb4c5f18e8421619753",
        tournamentRoundText: "2",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
            resultText: "Won",
            isWinner: true,
            status: null,
            name: "Bitcoin",
            picture: ""
          },
          {
            id: "d8b9f00a-0ffa-4527-8316-da701894768f",
            resultText: "Lost",
            status: null,
            name: "Swan",
            isWinner: false,
            picture: ""
          }
        ]
      },
      {
        id: "64be106892bb4c5f18e8421619755",
        nextMatchId: "64be106892bb4c5f18e8421619754",
        tournamentRoundText: "2",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
            resultText: "Won",
            isWinner: true,
            status: "PLAYED",
            name: "Bitcoin",
            picture: ""
          },
                {
            id: "14754a1a-932c-4992-8dec-f7f94a339960",
            resultText: "Lost",
            isWinner: false,
            status: "PLAYED",
            name: "LinkGang",
            picture: ""
          },
        ]
      },
      {
        id: "64be106892bb4c5f18e8421619756",
        nextMatchId: "64be106892bb4c5f18e8421619754",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "d8b9f00a-0ffa-4527-8316-da701894768e",
            resultText: "Lost",
            isWinner: false,
            status: null,
            name: "Unchained",
            picture: ""
          },
                {
            id: "d8b9f00a-0ffa-4527-8316-da701894768f",
            resultText: "Won",
            isWinner: true,
            status: null,
            name: "Swan",
            picture: ""
          }
        ]
      },
      {
        id: "64be106892bb4c5f18e8421619757",
        nextMatchId: "64be106892bb4c5f18e8421619753",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
              {
            id: "42fecd89-dc83-4821-80d3-718acb50a30c",
            resultText: "Lost",
            status: null,
            name: "Blockstream",
            isWinner: false,
            picture: ""
          },
          {
            id: "9397971f-4b2f-44eb-a094-722eb286c59b",
            resultText: "Won",
            status: null,
            name: "Bitfury",
            isWinner: true,
            picture: ""
          },
        ]
      },
      {
        id: "64be106892bb4c5f18e8421619758",
        nextMatchId: "64be106892bb4c5f18e8421619757",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "9397971f-4b2f-44eb-a094-722eb286c59c",
            resultText: "Lost",
            isWinner: false,
            status: null,
            name: "Lightning Labs",
            picture: ""
          },
                {
            id: "9397971f-4b2f-44eb-a094-722eb286c59b",
            resultText: "Won",
            isWinner: true,
            status: null,
            name: "Bitfury",
            picture: ""
          }
        ]
      },
      {
        id: "64be106892bb4c5f18e8421619759",
        nextMatchId: "64be106892bb4c5f18e8421619757",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "42fecd89-dc83-4821-80d3-718acb50a30c",
            resultText: "Won",
            isWinner: true,
            status: null,
            name: "Blockstream",
            picture: ""
          },
          {
            id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
            resultText: "Lost",
            isWinner: false,
            status: null,
            name: "Strike",
            picture: ""
          },
        ]
      },

  // Additional for height testing

  /*   {
        id: "64be106892bb4c5f18e84214761975679",
        nextMatchId: "64be106892bb4c5f18e8421619757",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "42fecd89-dc83-4821-80d3-718acb50a30c",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Blockstream",
            picture: ""
          },
          {
            id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Strike",
            picture: ""
          },
        ]
      },
      {
        id: "64be106892bb4c5f18e84234245214761975679",
        nextMatchId: "64be106892bb4c5f18e8421619757",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "42fecd89-dc83-4821-80d3-718acb50a30c",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Blockstream",
            picture: ""
          },
          {
            id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Strike",
            picture: ""
          },
        ]
      },
      {
        id: "64be106892bb4c5f18e84214761975234252679",
        nextMatchId: "64be106892bb4c5f18e8421619757",
        tournamentRoundText: "1",
        startTime: "",
        state: "SCHEDULED",
        participants: [
          {
            id: "42fecd89-dc83-4821-80d3-718acb50a30c",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Blockstream",
            picture: ""
          },
          {
            id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
            resultText: null,
            isWinner: false,
            status: null,
            name: "Strike",
            picture: ""
          },
        ]
        },
    */   
    ] 

  // const simpleSmallBracket = transformData(tournamentObj)
  const simpleSmallBracket = simpleSmallBracketObj

  const CustomMatch = ({ match, ...props }) => {
    return (
      <Match {...props} match={match}>
        {match.participants.map((participant) => (
          <div key={participant.id} style={{ display: 'flex', alignItems: 'center' }}>
            {participant.picture && (
              <img
                src={participant.picture}
                alt="Participant"
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
              />
            )}
            <span>{participant.name}</span>
          </div>
        ))}
        {props.children}
      </Match>
    )
  }

  function AlterSizes() {
    let totalHeight, totalWidth;

    const numberOfRows = simpleSmallBracket.filter(match => match.tournamentRoundText === "1").length;
    const bracketHeight = 165 * numberOfRows + 90;

    if (bracketHeight < window.innerHeight) {
      totalHeight = window.innerHeight;
    } else {
      totalHeight = bracketHeight;
    }

    const numOfColumns = Math.ceil(Math.log2(simpleSmallBracket.length + 1));
    const bracketWidth = 350 * numOfColumns + 50;

    if (bracketWidth < window.innerWidth) {
      totalWidth = window.innerWidth;
    } else {
      totalWidth = bracketWidth;
    }

    return { totalWidth, totalHeight };
  }

  export default function App() {
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }, [])

    const [mouseMoved, setMouseMoved] = useState(false)

    const onMouseDown = (e) => {
      const slider = document.querySelector('.slider')
      setStartX(e.pageX - slider.offsetLeft)
      setStartY(e.pageY - slider.offsetTop)
      setMouseDownPos({ x: e.pageX, y: e.pageY })
      setScrollLeft(slider.scrollLeft)
      setScrollTop(slider.scrollTop)
      setDragging(true)
      setMouseMoved(false)
    }

    const onMouseUp = (e) => {
      setDragging(false)

      if (!mouseMoved) {
        console.log('Click event')
      }
    }

    const onMouseMove = (e) => {
      if (!dragging) return
      e.preventDefault()
      const slider = document.querySelector('.slider')
      const x = e.pageX - slider.offsetLeft
      const y = e.pageY - slider.offsetTop
      const walkX = (x - startX) * 3
      const walkY = (y - startY) * 3
      slider.scrollLeft = scrollLeft - walkX
      slider.scrollTop = scrollTop - walkY

      setMouseMoved(true) // Set mouseMoved flag to true if mouse moves after mouse down
    }

    const onMouseLeave = () => {
      setDragging(false)
    }

    return (
      <div 
        className="slider"
        style={{ width: '100vw', height: '100vh', overflow: 'auto', cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <SingleElimination 
          matches={simpleSmallBracket} 
          dragging={dragging} 
          onMouseDown={onMouseDown} 
          onMouseUp={onMouseUp} 
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      </div>
    )}

  function SingleElimination({ matches, dragging, onMouseDown, onMouseMove, onMouseUp }) {
      const [showTextBox, setShowTextBox] = useState(false);
      const [showPartyBox, setShowPartyBox] = useState(false);
      const [text, setText] = useState("");
      const [position, setPosition] = useState({ x: 0, y: 0 });
    
      let { totalWidth,totalHeight } = AlterSizes();

    useEffect(() => {
      const handleResize = () => {
        const sizes = AlterSizes();
        totalWidth = sizes.totalWidth;
        totalHeight = sizes.totalHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <>
        <SingleEliminationBracket
          theme={GlootTheme}
          matches={matches}
          matchComponent={CustomMatch}
          svgWrapper={({ children, ...props }) => (
            <svg
              id="svg-wrapper"
              width={totalWidth}
              height={totalHeight}
              style={{ background: "rgb(11, 13, 19)" }}
              preserveAspectRatio="none"
              {...props}
            >
              <rect
                width="100%"
                height="100%"
                fill="transparent"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove} 
              />
              {children}
            </svg>
          )}
            onMatchClick={(match) => {
              if (dragging) return;

              setPosition({ x: match.clientX, y: match.clientY });
              setShowPartyBox(false);
              setText(`Match ID: ${match.match.id}\nMatch Time: ${match.match.startTime}\nMatch State: ${match.match.state}`);
              setShowTextBox(true);
            }}
            onPartyClick={(match) => {
              if (dragging) return;
              setPosition({ x: match.clientX, y: match.clientY });
              setShowPartyBox(false);
              if (match && match.players) {
                const filteredPlayers = match.players.filter(player => player.ingame != null && player.ingame !== "" && player.ingame !== "null" && player.ingame !== undefined);
    
                if (filteredPlayers.length > 0) {
                  const playerIngameValues = filteredPlayers.map(player => player.ingame).join('\n');
                  setText(`<span style="font-size: 1.25em font-weight: bold">${match.name}</span>\n\n<b>Players:</b> \n${playerIngameValues}`);
                } else {
                  setText("No match or players available.");
                }
              } else {
                setText("No match or players available.");
              }
              setShowTextBox(true);
            }}
          />
          <TextBox text={text} show={showPartyBox} setShow={setShowPartyBox} />
          <TextBox text={text} show={showTextBox} setShow={setShowTextBox} />
        </>
      );
  }
    
  const GlootTheme = createTheme({
    textColor: { main: "#000000", highlighted: "#F4F2FE", dark: "#707582" },
    matchBackground: { wonColor: "#2D2D59", lostColor: "#1B1D2D" },
    score: {
      background: {
        wonColor: `#10131C`,
        lostColor: "#10131C"
      },
      text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" }
    },
    border: {
      color: "#292B43",
      highlightedColor: "RGBA(152,82,242,0.4)"
    },
    roundHeader: { backgroundColor: "#3B3F73", fontColor: "#F4F2FE" },
    connectorColor: "#3B3F73",
    connectorColorHighlight: "RGBA(152,82,242,0.4)",
    svgBackground: "#0F121C"
  })



