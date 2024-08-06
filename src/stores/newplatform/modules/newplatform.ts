import { NewPlatform } from '@/utils/newplatform';
import { defineStore } from 'pinia';
import { EVENT } from '@/utils/newplatform';

const useNewPlatform = defineStore({
  id: 'newplatform',
  state: () => ({
    loadingPercent: 0,
    loaded: false,

    errorMsg: '',
    ModelContainers: <{ platform: NewPlatform | undefined }>{
      platform: undefined,
    },

  }),
  getters: {
    isLoading(): boolean {
      return !this.loaded;
    },
    loadingMsg(): string {
      return this.loadingPercent == 100 ? '模型加载成功' : `模型已加载:${this.loadingPercent.toFixed(2)}%`;
    },
  },
  actions: {
    platformAddCanvas(canvas: HTMLElement, size: [number, number],onLoading: (e: any) => void) {
      this.ModelContainers.platform?.addEventListener(EVENT.LOADING, this.onLoading);

      this.ModelContainers.platform = new NewPlatform(canvas, size,onLoading);
    },
    onLoading(e: any) {
      console.log(e);

      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        console.log(`Model loading: ${Math.round(percentComplete)}% complete`);
        return percentComplete;
      }

    },
    cast(x: number, y: number) {
      this.ModelContainers.platform?.cast(x, y);
    }
  }
});

export default useNewPlatform;