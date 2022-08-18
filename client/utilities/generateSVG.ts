export default function generateSVG(
  prediction: string,
  twitterName: string,
  width: number,
  height: number,
) {
  return `<svg
        xmlns="http://www.w3.org/2000/svg"
        width=${width}
        height=${height}
      >
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap');
          </style>
          <style>
          .foreign-object {
              height: 100%;
              width: 100%;
          }
          .flex-container {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: space-around;
              flex-direction: column;
          }
          .card {
              flex: 0 0 auto;
              display: flex;
              padding: 10%;
              flex-direction: column;
              font-family: roboto;
              color: black;
              background-color: white;
              border-radius: 4px;
              cursor: default;
              box-shadow: 0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;
          }
          .title {
              flex: 1 1 auto;
              font-size: 200%;
              text-align: center;
              margin-bottom: 10%;
          }
          .main-content {
              flex: 1 1 auto;
              font-size: 100%;
          }
          textArea {
              width: 100%;
              border: none;
              background: transparent;
              resize: none;
              color: black;
              font-family: roboto;
          }
          .twitter {
              text-align: right;
          }
          .footer {
              margin-top: 10%;
              font-size: 90%;
              flex: 1 1 auto;
              text-align: center;
          }
          </style>
        </defs>
        <foreignObject height=${height} width=${width}>
          <div class="flex-container">
            <div class="card">
              <div class="title">2023 DeFi Predictions</div>
              <div class="main-content">
                <textArea disabled xmlns="http://www.w3.org/1999/xhtml">"${prediction}"</textArea>
                <div class="twitter">-${twitterName || 'anonymous'}</div>
              </div>
              <div class="footer">Centrifuge Time Capsule</div>
            </div>
          </div>
        </foreignObject>
      </svg>`;
}
