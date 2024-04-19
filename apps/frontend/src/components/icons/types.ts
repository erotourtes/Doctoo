import React from "react";

export type IconVariant =
  'logo' |
  'logo-white' |
  'account' |
  'logout' |
  'appointments' |
  'date' |
  'timer' |
  'chats' |
  'join-the-call' |
  'leave-the-call' |
  'mute' |
  'muted' |
  'send-message' |
  'attach' |
  'download' |
  'edit' |
  'delete' |
  'file' |
  'search' |
  'star' |
  'blood-type' |
  'height' |
  'weight' |
  'arrow-right' |
  'shevron-right' |
  'shevron-mini-closed' |
  'shevron-mini-open' |
  'warning' |
  'valid' |
  'my-doctors' |
  'quick-notes' |
  'change' |
  'dashboard' |
  'settings' |
  'credit-card' |
  'facebook' |
  'google' |
  'close' |
  'eye-closed' |
  'eye-open' |
  'minus' |
  'plus' |
  'pause' |
  'record' |
  'stop' |
  'video-stopped' |
  'video' |
  'subtitles' |
  'board' |
  'favorite-empty' |
  'favorite-filled' |
  'gender' |
  'help' |
  'location-target' |
  'sent-invoice' |
  'share-screen';

export type IconProps = {
  variant: IconVariant,
} & React.SVGProps<SVGSVGElement>