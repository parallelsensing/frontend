interface Window {
  $message: any;
  copyToClipboard: (button: HTMLButtonElement) => void;
}

type TimeProp= NodeJS.Timeout