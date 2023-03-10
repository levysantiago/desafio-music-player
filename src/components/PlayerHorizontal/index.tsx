import React, { useCallback, useEffect } from "react";
import { getSongProgressPercentage } from "../../helpers/get-song-progress-percentage";
import { secondsToDuration } from "../../helpers/seconds-to-duration";
import { ISong } from "../../repositories/SongRepository";
import SongsList from "../SongsList";
import SoundControl, { ISoundControlProps } from "../SoundControl";
import SoundProgress from "../SoundProgress";
import {
  AlbumImg,
  BandTitle,
  CloseIcon,
  Container,
  HiddenContent,
  ImageTitlesContainer,
  MusicList,
  QueueIcon,
  SongTitle,
  SoundControlContainer,
  SoundProgressContainer,
  TitlesContainer,
} from "./styles";

interface IProps extends ISoundControlProps {
  audioCurrentTime?: string;
  selectSong: (song: ISong) => void;
  song: ISong;
  index: number;
}

const PlayerHorizontal: React.FC<IProps> = (props: IProps) => {
  const { song, audioCurrentTime, audio, selectSong, index } = props;

  const musicList = document.getElementById(`music-list${index}`);
  const hiddenContent = document.getElementById(`hidden-content${index}`);

  const openQueue = () => {
    if (musicList && hiddenContent) {
      musicList.style.height = "100%";
      musicList.style.visibility = "visible";
      setTimeout(() => {
        hiddenContent.style.visibility = "visible";
      }, 300);
    }
  };

  const closeQueue = useCallback(() => {
    if (musicList && hiddenContent) {
      musicList.style.height = "0px";
      hiddenContent.style.visibility = "hidden";
    }
  }, [musicList, hiddenContent]);

  useEffect(() => {
    closeQueue();
  }, [song, closeQueue]);

  return (
    <Container>
      <ImageTitlesContainer>
        <AlbumImg
          src={require(`../../assets/band-images/${song.imageName}`)}
          alt="Album image"
        />

        {/* TITLES */}
        <TitlesContainer>
          <SongTitle>{song.title}</SongTitle>
          <BandTitle>{`${song.bandTitle}`}</BandTitle>
        </TitlesContainer>
      </ImageTitlesContainer>

      {/* SOUND CONTROL */}
      <SoundControlContainer>
        <SoundControl {...props} />
      </SoundControlContainer>

      {/* PROGRESS */}
      {audioCurrentTime ? (
        <SoundProgressContainer>
          <SoundProgress
            index={`horizontal-${index}`}
            barWidthPercent={
              audio
                ? getSongProgressPercentage(audio.currentTime, audio.duration)
                : 0
            }
            leftCounter={audioCurrentTime}
            rightCounter={audio ? secondsToDuration(audio.duration) : "00:00"}
            advanceProgress={(advancedPercentage: number) => {
              if (audio)
                audio.currentTime = audio.duration * advancedPercentage;
            }}
          />
        </SoundProgressContainer>
      ) : null}

      <QueueIcon onClick={openQueue} />
      <MusicList id={`music-list${index}`}>
        <HiddenContent id={`hidden-content${index}`}>
          <CloseIcon onClick={closeQueue} />

          <SongsList selectSong={selectSong} song={song} />
        </HiddenContent>
      </MusicList>
    </Container>
  );
};

export default PlayerHorizontal;
