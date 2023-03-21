type TextDefinition = {
  drawer: {
    licenses: string;
    policy: string;
    reviewRequest: string;
  };
  placeholder: string;
};

type Translations = {
  en: TextDefinition;
  ja: TextDefinition;
};

export const translations: Translations = {
  en: {
    drawer: {
      licenses: 'licenses',
      policy: 'privacy policy',
      reviewRequest: 'Please cooperate with the review',
    },
    placeholder: 'Enter it and tap the button below to enlarge it on the screen.',
  },
  ja: {
    drawer: {
      licenses: 'ライセンス',
      policy: 'プライバシーポリシー',
      reviewRequest: 'レビューにご協力ください',
    },
    placeholder: '入力して下のボタンをタップすると、画面に大きく表示できます。',
  },
};
