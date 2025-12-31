import { ref, computed } from 'vue';

const doctorImg = "/figma/doctor.png";


export function useStatusCheck() {
  const statusChoice = ref<number>(-1);

  const showHelperText = computed(() => statusChoice.value !== -1);

  const onSelectChoice = (choice: number) => {
    statusChoice.value = choice;
    console.log('用户选择了:', choice === 1 ? '是' : '否');
  };

  const onTapNext = () => {
    if (statusChoice.value === -1) {
      console.log("请先进行选择");
      alert("请先告诉医生您今日是否感到不适");
      return;
    }
    console.log("提交选择，进入下一步");

  };

  return {
    doctorImg,
    statusChoice,
    showHelperText,
    onSelectChoice,
    onTapNext
  };
}