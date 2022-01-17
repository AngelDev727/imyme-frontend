export default {
    // General
    'unsupported browser':
        "Your browser isn't supported,  Imyme may not function as intended",
    'missing auth':
        'ログインの有効期限が切れました。再度ログインを行なってください',
    // Sign in/up pages
    メールアドレスまたはパスワードが間違っています:
        'メールアドレスまたはパスワードが間違っています',
    'Unidentified customer': 'メールアドレスまたはパスワードが間違っています',
    'メール は既に使用されています': 'このメールアドレスはすでに使われています',
    'Email has already been taken': 'このメールアドレスはすでに使われています',
    'お客様の作成可能数が上限に達しました。後でもう一度お試しください。':
        '只今大変混み合っております。しばらくしてから再度お試しください',
    'Password Mismatch': 'パスワードが一致していません',
    // Password reset page
    無効なリセットトークン:
        'パスワード再設定の有効期限が切れています。パスワードメールを再発行してください',
    // Credit card payment page
    'Your card is not supported.':
        'サポートされていないカードです。Visa, Mastercard, American Expressのいずれかをお使いください',
    'Your card number is incomplete.': 'カード番号が正しく入力されていません',
    'Your card number is invalid.': 'カード番号が不正です',
    "Your card's expiration date is in the past.":
        'カードの有効期限が過ぎています',
    "Your card's expiration date is incomplete.":
        'カードの有効期限が正しく入力されていません',
    "Your card's expiration year is invalid.":
        'カードの有効期限が間違っています',
    "Your card's expiration year is in the past.":
        'カードの有効期限が過ぎています',
    "Your card's security code is incomplete.":
        'セキュリティコードが正しく入力されていません',
    // Errors for Stripe elements
    // invalid_number: 'カード番号が不正です',
    incorrect_number: 'カード番号が間違っています',
    incomplete_number: 'カード番号が正しく入力されていません',
    invalid_number: 'カード番号が間違っています',
    invalid_expiry_month: 'カードの有効期限が間違っています',
    invalid_expiry_month_past: 'カードの有効期限が過ぎています',
    invalid_expiry_year: 'カードの有効期限が間違っています',
    invalid_expiry_year_past: 'カードの有効期限が過ぎています',
    incomplete_expiry: 'カードの有効期限が正しく入力されていません',
    invalid_cvc: 'セキュリティコードが間違っています',
    incomplete_cvc: 'セキュリティコードが正しく入力されていません',
    incorrect_cvc: 'セキュリティコードが間違っています',
    expired_card: 'カードの有効期限が過ぎています',
    // Zip code is not used in Japan
    'incorrect zip': '郵便番号が間違っています',
    card_declined: '決済に失敗しました。カード情報を再度ご確認ください',
    missing: '請求を行なったお客様にカード情報が紐づいていません',
    processing_error:
        'カードの処理中にエラーが発生しました。再度お試しください',
    rate_limit:
        '只今大変混み合っております。しばらくしてからも再度お試しください',
    'price-error': `システムエラーが発生しました。
    一度カートから商品を削除していただくか、再度ログインをお試しください。`,
    // Address form
    'Phone は既に使用されています': '既にこの電話番号は使われています',
    // Checkout
    'no checkoutToken': 'カートの処理中に問題が発生しました。',
    'no paymentToken': 'お支払いの処理中に問題が発生しました。',
    'no shippingPrefecture': '住所の処理中に問題が発生しました',
    'no customerId': 'お客様情報の処理中に問題が発生しました',
    // Default message
    catchAll: 'システムエラーが発生しました。再度お試しください',
    'invalid date update subscription':
        '変更できるのは次回注文日の1週間前までとなります',
    'next charge date is not far enough in the future':
        'サイクル変更後の次回注文日が本日から1週間後以降の日付となるようご変更ください',
    'Invalid Email Address':
        '不正なメールアドレスです',
    'Out of stock':
        '申し訳ございません、只今品切れ中です',
    'Phone 無効です':
        '不正な電話番号です',
    'Province が有効ではありません':
        '不正な都道府県名です',
    'お客様用の住所はすでに存在しています':
        '既にこの住所は使われています',
    '半角英数字のみです':
        'ニックネームは半角英数字のみです',
    '2文字以上入力してください':
        'ニックネームは2文字以上入力してください',
    '10文字以内で入力してください':
        'ニックネームは10文字以内で入力してください',
}
