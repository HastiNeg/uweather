import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Turing Weather Report"


  return (
    <div style={{
      direction: "rtl", minHeight: "11vh",
    }}>
      <br-x />
      <Window title={name} style={{
        color: "#E0E8E5",
        fontSize: 20,
        minHeight: 200,
        margin: 110,
        width: "55%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        fontFamily: "optima",
        opacity: "70%"
      }}>

        {/* #5E0058 */}
        <div style={{ width: "100%", height: 380, backgroundColor: "#1B324D", textAlign: "center", padding: 10, }}>
          <br /><br />
          Weather feels like: {props.condition}°c ☼
          <br /><br />
          Average Temperature: {props.weather2}°c 🌡
          <br /><br />
          Cloud Cover: {props.cloudcover} ☁︎
          <br /><br />
          Moon Phase: {props.weather} ☾
          <br /><br />
          Sunrise: {props.sunrise} ↑
          <br /><br />
          Sunset: {props.sunset} ↓
        </div>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
  let res = await fetch("https://cdn.turing.team/research/api/weather/");
  let data = await res.json();
  let condition = await data.current_condition;
  let weather = await data.weather;

  console.log(condition[0].temp_C)
  console.log(data.weather[0].astronomy[0].moon_phase)
  console.log(weather[0].avgtempC)
  console.log(condition[0].cloudcover)
  console.log(data.weather[0].astronomy[0].sunrise)
  console.log(data.weather[0].astronomy[0].sunset)



  // console.log("DEGREEEEEEEEEEEEEEEEEEEEEEEEEE:", FeelsLikeC)

  return {
    props: {
      data: global.QSON.stringify({
        condition: condition[0].temp_C,
        weather: weather[0].astronomy[0].moon_phase,
        weather2: weather[0].avgtempC,
        cloudcover: condition[0].cloudcover,
        sunrise: weather[0].astronomy[0].sunrise,
        sunset: weather[0].astronomy[0].sunset,
        session,
        // nlangs,
      })
    },
  }
}