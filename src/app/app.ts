import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild('player')
  private readonly playerRef?: ElementRef<HTMLAudioElement>;

  protected readonly songUrl = '/message-in-a-bottle.mp3';

  protected isPlaying = false;
  protected playbackError = '';

  protected async togglePlayback(): Promise<void> {
    const player = this.playerRef?.nativeElement;

    if (!player) {
      return;
    }

    if (player.paused) {
      try {
        this.playbackError = '';
        await player.play();
        this.isPlaying = true;
      } catch {
        this.isPlaying = false;
        this.playbackError = 'Tap again if your browser blocked playback.';
      }

      return;
    }

    player.pause();
    this.isPlaying = false;
  }

  protected syncPlaybackState(): void {
    this.isPlaying = !this.playerRef?.nativeElement.paused;
  }
}
