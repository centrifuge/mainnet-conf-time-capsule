import styles from '../styles/Home.module.css';

type Props = {
  prediction: string;
  twitterName: string;
  width: number;
  height: number;
};

export default function SVGGenerator({
  prediction,
  twitterName,
  width,
  height,
}: Props) {
  return (
    <svg
      //   style={{ width: '300px', height: '300px' }}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <defs>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        </style>
        <style>{`
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
            padding: 10px 20px;
            flex-direction: column;
            font-family: roboto;
            color: black;
            background-color: white;
            border-radius: 25px;
            border: 2px solid black;
            cursor: pointer;
        }
        .title {
            flex: 1 1 auto;
            font-size: 21px;
            text-align: center;
        }
        .main-content {
            flex: 1 1 auto;
        }
        textArea {
            width: 100%;
            border: none;
            background: transparent;
            resize: none;
            color: black;
        }
        .twitter {
            text-align: right;
        }
        .footer {
            flex: 1 1 auto;
            text-align: center;
        }
        `}</style>
      </defs>
      <foreignObject height={height} width={width}>
        <div className="flex-container">
          <div className="card">
            <div className="title">2023 DeFi Predictions</div>
            <div className="main-content">
              <textArea disabled xmlns="http://www.w3.org/1999/xhtml">
                {`"${prediction}"`}
              </textArea>
              <div className="twitter">{`-${twitterName}`}</div>
            </div>
            <div className="footer">Centrifuge Time Capsule</div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
