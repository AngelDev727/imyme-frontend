<template>
    <div>
        <div id="page-top" v-scroll="handleScroll" style="opacity: 0; pointer-events: none" @click="handleClick">
            <a href="https://imyme.jp/survey/1" class="lp1-btn-shiny">ベストなスキンケアを診断する ▶</a>
        </div>
        <div class="top">
            <img src="@app/assets/images/lp1/lp1_top_3.jpg" alt="あなたのスキンケア本当にベスト？" class="lp1topImg">
            <img src="@app/assets/images/lp1/lp1_top_crown.jpg" alt="あなたのスキンケア本当にベスト？" class="lp1topImg">
        </div>
        <div class="intro-lp1">
            <ul>
                <li class="intro-img"><img src="@app/assets/images/lp1/intro.png" alt="What’s imyme" class="introImg"></li>
                <li class="intro-txt">
                    <p class="intro-txt-title">What’s imyme</p>
                    <h4><p></p></h4>
                    <p class="intro-txt-content">今のあなたにベストなスキンケアを届けたい！
                        そんな気持ちから生まれたimymeは
                        ”あなたの肌が今一番必要としている成分”が
                        フレッシュな状態で配合されるオリジナルスキンケア。
                        100を超える独自のレシピから
                        毎月作りたてをお届けすることで、
                        あなたの肌力を長期的にマネジメントします。
                    </p></li>
            </ul>
        </div>
        <div class="top-btn">
            <a href="https://imyme.jp/survey/1" class="lp1-btn-shiny" @click="handleClick">ベストなスキンケアを診断する ▶</a>
        </div>
        <div class="intro-lp2">
            <h2><span class="big-txt">世界初<span class="small-txt">※2</span>！</span>セラムサーバーを開発！</h2>
            <p>肌分析に基づき<br>
                目の前でわたしだけのフレッシュな成分を<br>
                配合してくれるサーバーです。
            </p>
            <div class="swiper-container">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide"><img src="@app/assets/images/lp1/lp1_intro2.png"  alt="世界初！セラムサーバーを開発！" class="intro2Img"></div>
                    <div class="swiper-slide"><img src="@app/assets/images/lp1/lp1_intro2_2.png"  alt="世界初！セラムサーバーを開発！" class="intro2Img"></div>
                    <div class="swiper-slide"><img src="@app/assets/images/lp1/lp1_intro2_3.png"  alt="世界初！セラムサーバーを開発！" class="intro2Img"></div>
                </div>
                <!-- If we need pagination -->
                <div class="swiper-pagination"></div>

                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev" style="fill: #666666;"></div>
                <div class="swiper-button-next"></div>
            </div>
            <p class="slide-warning">※1 アンケートモニター提供元:ゼネラルリサーチ<br>調査期間:2019年10月24日~30日<br>調査方法:インターネット調査<br>調査概要:スキンケア10商品を対象にしたサイト比較イメージ調査<br>調査対象:全国の20代~50代の男女1056名<br>
                ※2 自社調べ(2019年4月地点)
            </p>
        </div>
        <img src="@app/assets/images/lp1/lp1_intro2_1.jpg" alt="天然成分にこだわりました" class="intro2Img">
        <div class="intro3-lp2">
            <h4>肌本来の機能を<span class="dot-text">最大限</span>に活かすために</br> 肌菌(常在菌)の邪魔をする成分は<span class="dot-text">一切</span>使用していません。</h4>
            <ul class="intro3-list">
                <li><img src="@app/assets/images/lp1/lp1_intro3.jpg" alt="肌本来の機能を最大限に活かすために肌菌(常在菌)の邪魔をする成分は一切使用していません。" class="intro3Img"></li>
                <li class="intro3-list-txt">
                    <p><span>・合成防腐剤</span></p>
                    <p><span>・石油由来合成界面活性剤</span></p>
                    <p><span>・エタノール</span></p>
                    <p><span>・合成色素</span></p>
                    <p><span>・シリコン</span></p>
                    <p><span>・合成ポリマー</span></p>
                    <p><span>・乳化剤</span></p>
                    <p><span>・グリセリン</span></p>
                </li>
            </ul>
            <div class="intro-lp3-box-all">
                <h3>imymeが選ばれる<span>3</span>つの理由</h3>
                <div class="intro-lp3-box">
                    <h4>1.Matchingでスキンケア難民から卒業</h4>
                    <p>15問の診断からあなたの肌を分析し、
                        100種類のレシピから肌にぴったりの成分を成分配合します。
                        10万人の肌データを分析した研究者考案のレシピだから、あなたの肌が欲しがるスキンケアをお届けします。</p>
                </div>
                <div class="intro-lp3-box">
                    <h4>2.Freshな成分でもう肌トラブルに悩まない</h4>
                    <p>肌トラブルの原因として、化粧品に含まれている防腐剤や界面活性剤などが肌本来のはたらきの邪魔をしてしまうことがあります。imymeでは、肌本来の機能を邪魔する成分は一切使用せず新鮮な状態でお届けするので、今まで防腐剤なしでは配合できなかった新鮮でパワフルな植物由来エッセンスもお使いいただけます。</p>
                </div>
                <div class="intro-lp3-box">
                    <h4>3.Cleanコスメによる健康的なキメ肌で魅力UP</h4>
                    <p>全ての成分はもちろん、製造年月日や消費期限を記載し、フレッシュな状態でお使いいただくことを徹底しています。肌から体内に吸収されても安全な成分で、安心して肌力をアップし肌からあなたの魅力を引き出します。</p>
                </div>
            </div>
        </div>
        <div class="campaign">
            <img src="@app/assets/images/lp1/campaign_title.png" alt="お試し価格でSTART!美肌習慣を身につけよう" class="campaignImg">
            <h3>お試し価格で<span class="campaign-title-font">START!</span></br>美肌習慣を身につけよう♪</h3>
            <img src="@app/assets/images/lp1/campaign_img_2.png" alt="どちらか選べるキャンペーン中！" class="campaignImg">
            <div class="campaign-explain">
                <p>imymeは1ヶ月毎に配送される定期購入サービスです。</br>購入後は、肌の状態、季節のおすすめ成分で新しいセラムを選び直すことができ、よりあなたの肌にあったスキンケアがご利用できます。</br> ※解約は配送予定日の1週間前までにお電話でご連絡ください。</p>
            </div>
        </div>
        <section class="sakura">
            <div class="sakura-content">
                <img src="@app/assets/images/sakuraLP/sakura-horizon.png" alt="サクラセラム境界線" class="sakuraBarImg">
                <img src="@app/assets/images/sakuraLP/sakura-top.png" alt="サクラセラムトップ" class="sakuraTopImg">
                <div class="sakura-content-introduction">
                    <h3>季節に合うセラムをお試ししませんか？</h3>
                    <div class="sakura-fukidashi">
                        <img src="@app/assets/images/sakuraLP/sakura-introduction.png" alt="サクラセラムトップ" class="sakurasmallImg">
                        <div class="sakura-balloon">
                            <p>まずは試してみると自分の肌に合ったセラムが見つかるよ！</p>
                        </div>
                    </div>
                    <h3>トライアルセットを使い終えた後に診断することで、今の肌にぴったりなセラムが選びやすくなります。</h3>
                </div>
                <div class="sakura-triangle"></div>
                <div class="sakura-triangle"></div>
                <img src="@app/assets/images/sakuraLP/sakura-campagin.png" alt="サクラセラムキャンペーン" class="sakuraTopImg">
                <div class="sakura-content-introduction sakura-feature">
                    <div class="sakura-title">
                        <img src="@app/assets/images/sakuraLP/sakura-icon.png" alt="サクラセラムしずく" class="sakuraShizukuImg">
                        <h2><span>季節限定！サクラセラムとは？</span></h2>
                    </div>
                    <div class="sakura-sub-title">
                        <h4>1年前、大好評で完売したサクラセラム<br>今年は少し保湿感をUPしました！</h4>
                        <p>ソメイヨシノの桜から水を加えず真空低温抽出*でエキス化。サクラの良質な植物が持つこうそやビタミンを生かしながら、フレッシュなままお届けします。</p>
                    </div>                    
                </div>
                <div class="sakura-content-introduction sakura-feature">
                    <div class="sakura-title">
                        <img src="@app/assets/images/sakuraLP/sakura-icon.png" alt="サクラセラムしずく" class="sakuraShizukuImg">
                        <h2><span>サクラセラムの特徴</span></h2>
                    </div>
                    <div class="sakura-featurelist">
                        <ul>
                            <li><img src="@app/assets/images/sakuraLP/sakura-point1.png" alt="サクラセラムポイント" class="sakuraPointImg"></li>
                            <li>
                                <h5>エイジングケアに優れています！</h5>
                                <p>桜の花に含まれているカフェオイルグルコースやケルセチングルコシドという成分は、肌の透明感、コラーゲン強化作用、抗糖化作用*を促します。</p>
                            </li>
                        </ul>
                        <ul>
                            <li><img src="@app/assets/images/sakuraLP/sakura-point2.png" alt="サクラセラムポイント" class="sakuraPointImg"></li>
                            <li>
                                <h5>ハリと潤い感がUP！</h5>
                                <p>加齢と共に減少するコラーゲンの生産を促進し、肌のハリや弾力をサポートしてくれます。また、桜の成分をベースにハチミツ、グルコシルセラミド、スイゼンジノリを配合し、潤いをもたらします。</p>
                            </li>
                        </ul> 
                        <ul>
                            <li><img src="@app/assets/images/sakuraLP/sakura-point3.png" alt="サクラセラムポイント" class="sakuraPointImg"></li>
                            <li>
                                <h5>ソメイヨシノの成分や香りを贅沢に感じる！</h5>
                                <p>真空低温抽出法では、水を加えず植物をエキス化するのでありのままのソメイヨシノを感じることができます。広がる桜の香りに癒されてください。</p>
                            </li>
                        </ul>                                                
                    </div>               
                </div>  
                <div class="sakura-content-introduction sakura-feature">
                    <div class="sakura-word">
                        <h3>くすみが気になる、ゴワゴワしてきた、ハリがなくなってきた、、そんな方に特にオススメのセラムです。</h3>
                    </div>
                </div> 
                <div class="sakura-content-introduction sakura-feature">
                    <a href="/product?id=f2bf6132-0023-4af0-9fca-a36e49a4366a&promotion=on" class="sakura-btn"><span>桜トライアルセットを試す</span></a>
                </div>
                <div class="sakura-content-introduction sakura-feature">
                    <div class="sakura-soap">
                            <div class="sakura-soap-icon">
                                <img src="@app/assets/images/sakuraLP/sakura-soapicon.png" alt="サクラセラム特典アイコン" class="sakuraSoapIconImg">
                            </div>
                            <div class="sakura-soap-content">
                                <img src="@app/assets/images/sakuraLP/sakura-soap.png" alt="サクラセラム特典" class="sakuraSoapImg">
                                <h4>優しく潤う、職人こだわりの枠練り石けん</h4>
                                <p>米ぬか、黒糖をベースに1ヶ月以上熟成させて作る無添加石けんです。枠練り製法特有の「天然保湿成分」で、肌に負担をかけずに汚れを落とすことができるのでお肌が弱い方にもオススメです。</p>
                            </div>
                    </div>
                </div>
                <div class="sakura-content-introduction sakura-feature">
                    <a href="/product?id=f2bf6132-0023-4af0-9fca-a36e49a4366a&promotion=on" class="sakura-btn"><span>桜トライアルセットを試す</span></a>
                </div>
                <div class="sakura-content-introduction sakura-feature">                    
                    <p>※抗糖化とは、糖化を抑えることです。<br>
                    ※真空低温抽出法は、水を加えず植物エキスを抽出するので、純度の高いエキスを抽出することができます。一般的に用いられている方法(水蒸気蒸留法)では、植物を入れた水を熱して蒸留するため温度は100℃に達します。高温になると芳香成分など壊れますが、真空低温抽出方法では温度が３５℃前後と低いため、成分を壊さずに抽出することができます。</p>
                </div> 
                <img src="@app/assets/images/sakuraLP/sakura-horizon.png" alt="サクラセラム境界線" class="sakuraBarImg">            
            </div>
        </section>
        <div class="campaign-list">
            <p class="campaign-list-title"><span>フレッシュ</span>な成分だから信じられる</br><span>1本完結</span>のシンプルスキンケア</p>
            <img src="@app/assets/images/lp1/campagin_3.jpg" alt="フレッシュな成分だから信じられる1本完結のシンプルスキンケア" class="campaignImg">
            <div class="campaign-list-arrow"></div>
            <div class="campaign-list-txt">
                <p> 現代の複雑化した肌状態に合わせて</br>カスタマイズした<span>100</span>のレシピ！</p>
            </div>
        </div>
        <div class="campaign-list2">
            <img src="@app/assets/images/lp1/campaign_2.png" alt="スキンケアに悩みがある" class="campaignImg">
            <ul>
                <li><span><img src="@app/assets/images/lp1/checked_icon.svg" alt="年々肌が敏感になってきた" class="boxIcon"></span>年々肌が敏感になってきた</li>
                <li><span><img src="@app/assets/images/lp1/checked_icon.svg" alt="肌のトラブルが増えた気がする" class="boxIcon"></span>肌のトラブルが増えた気がする</li>
                <li><span><img src="@app/assets/images/lp1/checked_icon.svg" alt="季節や年齢に合わせたスキンケアがわからない" class="boxIcon"></span>季節や年齢に合わせたスキンケアがわからない</li>
                <li><span><img src="@app/assets/images/lp1/checked_icon.svg" alt="友達のおすすめスキンケアを使っている" class="boxIcon"></span>友達のおすすめスキンケアを使っている</li>
                <li><span><img src="@app/assets/images/lp1/checked_icon.svg" alt="自分に合ったスキンケアを探し続けるのがしんどい" class="boxIcon"></span>自分に合ったスキンケアを探し続けるのがしんどい</li>
            </ul>
            <p><span class="txt-yellow">実は現在のスキンケアに</span><br/><span class="txt-yellow">満足していない人はこんなにいるんです。</span></p>
            <div class="campaign-list2-triangle"></div>
            <div class="campaign-list2-triangle"></div>
            <div class="gradetion-box">
                <h5>ライフスタイルや年齢によって違う肌</h5>
                <p>imymeでは、定期的な診断や季節により、 あなたの肌の求めている成分を見つけ出し
                    あなたにいつもベストな一本を作ることができます。</p>
            </div>
            <p class="campaign-list2-title"><span>ベストな一本は</span><br/><span>どうやって作るの？</span></p>
            <img src="@app/assets/images/lp1/campagin_3_img.png" alt="ベストな一本はどうやって作るの？" class="campaignImg2">
        </div>
        <div class="how-to-skin">
            <div class="simple-btn">質問に答える</div>
            <img src="@app/assets/images/lp1/how_qustions.gif" alt="質問に答える" class="howtoImg">
        </div>
        <div class="how-to-result">
            <div class="simple-btn">分析結果をみる</div>
            <h4>自分の肌について理解できる</h4>
            <img src="@app/assets/images/lp1/howtoResultImg.jpg" alt="分析結果をみる" class="howtoImg2">
            <p><span>分析結果を基に、あなたに一番合うレシピを、</span><br/><span>新鮮な成分で作っています。</span></p>
        </div>
        <div class="how-to-insta">
            <div class="simple-btn"> あなたにぴったりの商品をお届け</div>
            <h4>instagramでも話題！</h4>
            <ul>
                <li><img src="@app/assets/images/lp1/howtoInsta1.jpg" alt="あなたにぴったりの商品をお届け" class="howtoInstaImg"></li>
                <li><img src="@app/assets/images/lp1/howtoInsta2.jpg" alt="instagramでも話題！" class="howtoInstaImg"></li>
                <li><img src="@app/assets/images/lp1/howtoInsta3.jpg" alt="あなたにぴったりの商品をお届け" class="howtoInstaImg"></li>
                <li><img src="@app/assets/images/lp1/howtoInsta4.jpg" alt="instagramでも話題！" class="howtoInstaImg"></li>
            </ul>
        </div>
        <div class="about-imyme">
            <p class="about-imyme-txt-title"><span class="about-imyme-txt-title-bold">10万人</span>の肌分析から生まれた</p>
            <h4><p></p></h4>
            <p class="about-imyme-txt-title"><span class="about-imyme-txt-title-bold">imyme</span></p>
            <h4 class="about-imyme-small"><p></p></h4>
            <p class="about-imyme-txt-content">私たちは化粧品開発を行う前に10万人の肌を分析し<span class="line">スキンケア方法から化粧品の成分、生活習慣に至る迄</span>様々な角度から肌に まつわる検証をしてきました。</span>
                <span class="line">その結果、スキンケアを目的としているはずの化粧品が</span><span class="line">肌トラブルを引き起こし、肌のバリア機能が壊され</span><span class="line">
                    キメが摩耗している肌を多く発見しました。</span>
                <span class="line">本来、肌はキメの整った角質により肌内部の水分が</span><span class="line">保たれ外部から異物が中に入らない構造です。</span>
                <span class="line">だからこそ肌に負担をかけず、</span><span class="line">美容効果と自身の肌力を最大に活かす</span><span class="line">本物のスキンケアを味わっていただきたいのです。</span></p>
            <img src="@app/assets/images/lp1/aboutimymeImg.jpg" alt="10万人の肌分析から生まれたimyme" class="campaignImg">
            <div class="campaign-list-arrow"></div>
            <h5>新鮮でパワフルな成分を使い</br><span class="bold">1</span>本で完結する</br><span class="dot-text">ミニマル</span>スキンケアに辿り着く</h5>
            <img src="@app/assets/images/lp1/aboutimymeImg2.png" alt="新鮮でパワフルな成分を使い1本で完結するミニマルスキンケアに辿り着く" class="campaignImg">
        </div>
        <div class="about-imyme2">
            <div class="about-imyme2-mask">
                <p class="about-imyme2-txt">キメ肌を目指すなら、</br><span>自分のお肌を理解して悩みに合った成分を見極めるのが一番!</span>
                    </br>ただ、成分ってカタカナ多くて難しい... </br>まずは自分の<span>お肌の分析から始めましょう。</span></p>
                <div class="campaign-list2-triangle triangle-pink"></div>
                <div class="campaign-list2-triangle triangle-pink"></div>
                <div class="gradetion-box">
                    <h5>1年間通して自分の肌と向き合う</h5>
                    <p>imyme では、自分の肌と向き合える分析機能があり、 続けることで自分の肌を理解し
                        自分で肌に良いものを選んでいくことができます♪ 肌から体内に吸収されても安全な成分で、
                        長期的に魅力をUPしていきましょう。</p>
                </div>
            </div>
        </div>
        <div class="about-imyme3">
            <img src="@app/assets/images/lp1/aboutimymeImg3.png" alt="キャンペーンタイトル" class="campaignImg">
        </div>
        <div class="campaign">
            <img src="@app/assets/images/lp1/campaign_title.png" alt="お試し価格でSTART!美肌習慣を身につけよう" class="campaignImg">
            <h3>お試し価格でSTART!</br>美肌習慣を身につけよう♪</h3>
            <img src="@app/assets/images/lp1/campaign_img_2.png" alt="imymeは1ヶ月毎に配送される定期購入サービス" class="campaignImg">
            <div class="campaign-explain">
                <p>imymeは1ヶ月毎に配送される定期購入サービスです。 </br> 購入後は、肌の状態、季節のおすすめ成分で新しいセラムを選び直すことができ、
                    よりあなたの肌にあったスキンケアがご利用できます。</br> ※解約は配送予定日の1週間前までにお電話でご連絡ください。</p>
            </div>
        </div>
        <div class="qanda">
            <h3>Q&A</h3>
            <div class="qanda-title">
                <p>Q.1本を朝晩に使うとどれくらい持ちますか?</p>
            </div>
            <div class="qanda-txt">
                <p>A.imymeのセラムは、お届けする1セット(2本入り)で1ヶ月間お使いいただけます。使用量を守ってお使いください。</p>
            </div>
            <div class="qanda-title">
                <p>Q.オールインワンゲルとは何が違うのですか?</p>
            </div>
            <div class="qanda-txt">
                <p>A.一般的なオールインワンゲルは、旧表示指定成分 は無添加であっても、シリコンや界面活性剤など化学物質がふんだんに使用されています。
                    imymeのセラムは合成ポリマー、合成界面活性剤、合成香料、防腐 剤、エタノール、パラベンを無添加にし、
                    美容成分だけで構成されたオールインワンのセラムです。洗顔後 に 1つでお手入れが完了するという点では
                    同じですが、中身がまったく違います。</p>
            </div>
            <div class="qanda-title">
                <p>Q.これ1つで本当にお手入れが完結しますか?</p>
            </div>
            <div class="qanda-txt">
                <p>A.今まで保湿剤やシリコンがたっぷりと入ったお化粧品でお手入れをしていると、
                    馴れるまではimymeだけでは物足りなさを感じる方もいらっしゃるかもしれません。
                    物足りないときには、量を増やしたり重ねづけをするなど、使用量を調整してみてください。
                    次第にお肌が本来の機能を発揮し始め、乾燥しない強くしなやかな肌へと変わっていきます。
                    あるいは、もう少しリッチなつけ心地のレシピをお試しください。imymeを使い続けると、お肌の抗菌バランス、
                    水分と油分のバランスが整い、乾燥しない強い肌へと変わっていくのを実感していただけます。</p>
            </div>
            <div class="qanda-title">
                <p>Q.注文した商品は何日ぐらいで届きますか?</p>
            </div>
            <div class="qanda-txt">
                <p>A.imymeでは注文を受けてから製造しますので、ご注文いただく商品によって発送までにかかる日数が異なります。
                    例えばセラムや石けんの複数の商品をご注文いただいた場合は、ご注文番号ごとに商品が全て揃い次第、
                    発送致します。目安としてご注文後、約5日〜10日後の配送となります。注文の急増による発送の遅れ、
                    年末年始やバカンスシーズン(6月~9月)による物流混雑でお届けにより多くの日数がかかる場合がございます。
                    あらかじめご了承ください。</p>
            </div>
            <div class="qanda-title">
                <p>Q.保管について気をつけることはありますか?</p>
            </div>
            <div class="qanda-txt">
                <p>A.直射日光の当たる場所や極端に高温または低温になる場所を避けて保管してください。
                    高温多湿の浴室などでの保管は避けてください。ご使用後は容器の口もとが汚れないよう、
                    いつも清潔にしてお使いください。</p>
            </div>
        </div>
        <section class="text-center footer-section m-0">
            <div class="pt-2">
                <router-link class="mx-2 footer-link" to="/company">
                    会社概要
                </router-link>
            </div>
            <div class="pt-2">
                <router-link class="mx-2 footer-link" to="/privacy">
                    個人情報の取り扱いについて
                </router-link>
            </div>

            <div class="pt-2">
                <router-link class="mx-2 footer-link" to="/terms">
                    特定商取引法に基づく表記
                </router-link>
            </div>
            <div class="pt-2 pb-4 copyright-txt">
                <span class="mx-2">
                    Copyright &#169; kimelab inc. All Rights Reserved.
                </span>
            </div>
        </section>
    </div>
</template>
<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component({
    })
    export default class LpTopView extends Vue {
        startScroll
        //mimic the smooth scroll from j-query
        smoothScroll(top) {
            window.scrollBy(0, -top/20)
            if(window.scrollY < top/20) {
                window.scrollTo(0,0)
                window.clearInterval(this.startScroll)
            }
        }
        handleClick() {
            this.startScroll = window.setInterval(this.smoothScroll, 16, window.scrollY)
        }
        //mimic the show hide button from j-query
        handleScroll(evt, el) {
            if (window.scrollY > 900) {
                el.setAttribute('style', 'opacity: 1;')
            } else {
                el.setAttribute('style', 'opacity: 0; pointer-events: none')
            }
        }
        mounted() {
        let mySwiper2 = new Swiper('.swiper-container',{
            centeredSlides : true,
            loop: true,
            speed:600,
            autoplay:3000,
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        });
        }
    }

</script>
<style>
    *{
        font-family: 'Noto Sans JP', sans-serif, 'Fira Code', monospace;
    }
    #page-top {
        position: fixed;
        bottom: 20px;
        z-index: 999999;
        width: 100%;
        transition: opacity 300ms ease;
    }
    #page-top a {

    }
    .top-btn {
        padding-bottom: 10%;
    }
    #page-top a:hover {
        text-decoration: none;
        background: #999;
    }
    .navbar {
        display: none;
    }
    .boxIcon {
        width: 25px;
        vertical-align: text-top;
        padding-right: 3px;
    }
    .top {
        width: 100%;
        /*background-color: #ebe9eb;*/
    }
    span.small-txt {
        font-size: 0.2em;
        vertical-align: super;
    }
    .big-txt {
        font-size: 1.4em;
        letter-spacing: -.009em;
    }
    .lp1topImg {
        width: 100%;
    }
    a.lp1-btn-shiny {
        color: white;
    }
    .lp1-btn-shiny {
        display: block;
        position: relative;
        width: 90%;
        padding:8px 5px;
        margin: 3% auto 0 auto;
        background-image:-moz-linear-gradient(
                top,
                #3ab7c1 0%,
                #009ebf);

        background-image:-webkit-gradient(
                linear,left top,left bottom,
                from(#3ab7c1),
                to(#009ebf));
        box-shadow: 0 4px 2px 0 rgba(0, 0, 0, .1);
        border-radius: 24px;
        font-weight: bold;
        font-size:1.8em;
        color: #fff;
        text-align: center;
        text-decoration: none;
        overflow: hidden;
    }
    .lp1-btn-shiny:hover {
        text-decoration: none;
        color: #fff;
    }
    .lp1-btn-shiny::before {
        position: absolute;
        content: '';
        display: inline-block;
        top: -180px;
        left: 0;
        width: 30px;
        height: 100%;
        background-color: #fff;
        animation: lp1-btn-shiny 3s ease-in-out infinite;
    }
    @-webkit-keyframes lp1-btn-shiny {
        0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
        80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
        81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
        100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
    }
    .intro-lp1 p.intro-txt-title {
        font-size: 3.6em;
        font-weight: 400;
        line-height: 1.2em;
    }
    .intro-lp1 {
        margin: 0 auto;
        z-index: 99;
        position: relative;
        padding: 5% 0;
    }
    .intro-lp1 ul li {
        list-style: none;
        display: inline-block;
    }
    .introImg {
        width: 80%;
        display: block;
        margin-top: -50%;
    }
    .intro-lp1 ul li.intro-img {
        width: 25%;
        padding-left: 2%;
    }
    .intro-lp1 ul li.intro-txt {
        width: 75%;
    }
    .intro-lp1 h4 {
        font-size: 3.4em;
        background: linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        padding-bottom:10px;
        margin-top: -10px;
    }
    .intro-lp1 h4 p {
        display: block;
        background: #fff;
    }
    .intro-lp1 p {
        font-size: 1.4em;
        padding-right: 4%;
    }
    .intro-lp1 p.intro-txt-content {
        padding-top: 4%;
    }
    .intro-lp2 h2 {
        background: linear-gradient(transparent 70%, #ffff00 0%);
        font-size: 2.4em;
    }
    .intro-lp2 p {
        font-size: 1.6em;
        text-align: center;
        line-height: 1.4em;
        padding-top: 3%;
    }
    .intro-lp2 p.small-txt {
        text-align: left;
        font-size: 1.0em;
    }
    .intro-lp2 {
        background:linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        padding: 2% 3%;
    }
    .intro2Img {
        width: 100%;
        display: block;
    }
    .intro3-lp2 {
        padding: 5% 1%;
    }
    .intro3-lp2 h4 {
        font-weight: 600;
        text-align: center;
        font-size: 1.7em;
        line-height: 1.8em;
    }
    .dot-text {
        padding-top: .4em;
        background-position: top left -2px;
        background-repeat: repeat-x;
        background-size: 1.1em .3em;
        background-image: radial-gradient(.15em .15em at center center, red, red,#fcfcfc 100%);
        background-image: -webkit-radial-gradient(.15em .15em at center center,red,red 100%,transparent);
        background-image: -moz-radial-gradient(.15em .15em at center center,red,red 100%,transparent);
        background-image: -ms-radial-gradient(.15em .15em at center center,red,red 100%,transparent);
    }
    p.slide-warning {
        text-align: left;
        padding:0;
        font-size: 1.0em;
        color: #565656;
    }
    ul.intro3-list {
        margin: 5% auto;
    }
    ul.intro3-list li {
        display: inline-block;
        width: 50%;
        vertical-align: middle;
    }
    ul.intro3-list li.intro3-list-txt {
        padding-left: 4%;
    }
    ul.intro3-list li.intro3-list-txt p {
        color: red;
        text-decoration: line-through;
    }
    ul.intro3-list li.intro3-list-txt span {
        color: black;
    }
    .intro3Img {
        margin: 5% auto 0 auto;
        display: block;
        width: 100%;
    }
    .intro-lp3-box-all {
        /*display: -webkit-box;*/
        /*display: -moz-box;*/
        /*display: -ms-flexbox;*/
        /*display: -webkit-flex;*/
        /*display: flex;*/
    }
    .intro-lp3-box {
        border: 1px solid #ff9ea7;
        width: 96%;
        margin: 10px auto;
    }
    .intro-lp3-box-all h3 {
        text-transform: lowercase;
        font-weight: bold;
        text-align: center;
        font-size: 1.6em;
        letter-spacing: .05em;
        color: #777777;
    }
    .intro-lp3-box-all h3 span {
        font-size: 1.8em;
        font-weight: 500;
    }
    .intro-lp3-box h4 {
        background-color: #ff9ea7;
        color: #fff;
        padding: 4px 10px;
        text-align: left;
        font-size: 1.2em;
    }
    .intro-lp3-box h4 span {
        font-weight: bold;
    }
    .intro-lp3-box p {
        padding: 4px 10px;
        font-size: 1.0em;
        line-height: 1.6em;
    }
    .intro-lp3-box-all {
        font-weight: bold;
        font-size: 1.4em;
    }
    .campaign {
        clear:both;
        background-color: #fafafa;
    }
    .campaign img {
        background-color: #ffffff;
    }
    .campaign h3 {
        letter-spacing: .1em;
        font-size: 1.8em;
        padding: 1% 0;
    }
    .campaignImg,
    .campaignImg2 {
        width: 100%;
    }
    .campaignImg2 {
        background-color: #daf6f7;
    }
    .campaign-explain {
        background-color: #e7f9fb;
        padding: 2% 3%;
        line-height: 0.6em;
        font-size: 0.8em;
        margin-top: -5px;
        text-align: center;
    }
    .campaign-list {
        padding: 5% 0;
        text-align: center;
    }
    p.campaign-list-title {
        font-size: 1.8em;
        color: #666666;
        line-height: 2.2em;
        letter-spacing: .19em;
    }
    p.campaign-list-title span {
        font-size: 2.0em;
    }
    .campaign-list-txt {
        background-color: #ffb4bb;
        border: 0.5px solid white;
        box-shadow: 0px 0px 0px 8px #ffb4bb;
        margin: 4% 5%;
        font-size: 1.2em;
    }
    .campaign-list-txt p {
        padding: 3% 0;
        line-height: 1.8em;
        letter-spacing: .04em;
    }
    .campaign-list-txt span {
        font-size: 1.6em;
        letter-spacing: 0.1em;
    }
    .campaign-list2 {
        background-color: #f3f4f9;
    }
    .campaign-list2 ul {
        padding: 0 1% 5% 3%;
    }
    .campaign-list2 li {
        font-size: 1.8em;
        line-height: 1.6em;
        letter-spacing: -.02em;
    }
    .campaign-list-arrow {
        display:  inline-block;
        color: #4444;
        text-decoration:  none;
        border-radius: 5px;
        position:  relative;
        height: 50px;
        width: 80px;
    }
    .campaign-list-arrow::before {
        content:  '';
        width: 35px;
        height: 35px;
        display:  block;
        border-top: solid 2px;
        border-right: solid 2px;
        transform: rotate(-225deg);
        position:  absolute;
        top: 0;
        bottom:  0;
        left:  0;
        right:  0;
        margin:  auto;
    }
    .campaign-list2 span.txt-yellow {
        background: linear-gradient(transparent 70%, #ffff00 0%);
        letter-spacing: -.01em;
    }
    .campaign-list2 span {
        font-weight: bold;
        text-align: center;
        font-size: 1.4em;
        letter-spacing: .1em;
    }
    .campaign-list2 p {
        text-align: center;
        padding: 10px 0;
        line-height: 1.8em;
    }
    .campaign-list2 p.campaign-list2-title {
        padding: 40px 0 10px 0;
    }
    .campaign-list2-triangle {
        margin: 10px auto 0 auto;
        width: 0;
        height: 0;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-top: 10px solid #a5e8eb;
    }
    span.campaign-title-font {
        font-weight: bold;
    }
    .gradetion-box {
        margin: 2% auto;
        width: 90%;
        padding: 5%;
        background: -moz-linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        background: -webkit-linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        background: linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
    }
    .gradetion-box h5 {
        font-size: 1.9em;
        display: flex;
        align-items: center;
        padding-bottom: 2%;
    }
    .gradetion-box h5:before, .gradetion-box h5:after {
        content: "";
        flex-grow: 1;
        height: 1px;
        background: #444;
        display: block;
    }
    .gradetion-box h5:before {
        margin-right: .4em;
    }
    .gradetion-box h5:after {
        margin-left: .4em;
    }
    .gradetion-box p {
        line-height: 1.6em;
    }
    .simple-btn {
        display: block;
        position: relative;
        width: 60%;
        padding: 0.4em 0.2em;
        text-align: center;
        text-decoration: none;
        border: solid 1px #444;
        margin: 0 auto;
        font-size: 1.8em;
    }
    .how-to-skin {
        background-color: #daf6f7;
        padding: 15% 0 0 0;
        position: relative;
        margin-top: -5px;
    }
    .how-to-skin::after {
        content: '';
        position: absolute;
        top: 100%;
        width: 0;
        height: 0;
        border-top: 10vw solid #daf6f7;
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
        background-color: #b7edef;
    }
    .howtoImg {
        width: 70%;
        margin: 10% auto;
        display: block;
    }
    .howtoImg2 {
        width: 85%;
        margin: 2% auto 10% auto;
        display: block;
    }
    .how-to-result {
        background-color: #b7edef;
        padding: 15% 0 5% 0;
        position: relative;
    }
    .how-to-result::after {
        content: '';
        position: absolute;
        top: 100%;
        width: 0;
        height: 0;
        border-top: 10vw solid #b7edef;
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
        background-color: #85e7ea;
    }
    .how-to-result p {
        text-align: center;
        font-weight: bold;
        font-size: 2.0em;
        line-height: 1.6em;
    }
    .how-to-result h4 ,
    .how-to-insta h4 {
        position: relative;
        text-align: center;
        padding: 0 1em;
        font-size: 2.4em;
        margin: 5% 0;
        text-transform:lowercase;
    }
    .how-to-result h4:before,
    .how-to-result h4:after,
    .how-to-insta h4:before,
    .how-to-insta h4:after {
        position: absolute;
        display: inline-block;
        content: '';
        top: 50%;
        width: 20px;
        height: 1px;
        background-color: #444;
    }
    .how-to-result h4:before ,
    .how-to-insta h4:before {
        left:10%;
        -webkit-transform: rotate(-120deg);
        transform: rotate(-120deg);
    }
    .how-to-result h4:after ,
    .how-to-insta h4:after {
        right: 10%;
        -webkit-transform: rotate(-60deg);
        transform: rotate(-60deg);
    }
    .how-to-insta {
        background-color: #85e7ea;
        padding: 20% 0 5% 0;
        margin: 0 auto;
        text-align: center;
    }
    .how-to-insta ul li {
        width: 48%;
        display: inline-block;
        padding: 1%;
    }
    .howtoInstaImg {
        width: 100%;
        display: block;
    }
    .about-imyme {
        padding:10% 0 0 0;
        text-align: center;
        background-color: #fcfcfc;
    }
    .about-imyme h4 {
        font-size: 3.4em;
        background: linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        padding-bottom:10px;
        margin: -10px auto 0 auto;
        width: 80%;
    }
    .about-imyme h4.about-imyme-small {
        font-size: 3.4em;
        background: linear-gradient(-45deg,#fcd2d6,#e1d5fc,#e1f4f5);
        padding-bottom:10px;
        margin: -10px auto 0 auto;
        width: 20%;
    }
    .about-imyme-txt-title {
        font-size: 2.8em;
        font-weight: 500;
        line-height: 1.2em;
    }
    span.about-imyme-txt-title-bold {
        font-weight: 500;
    }
    p.about-imyme-txt-content {
        padding: 5% 7%;
        text-align: center;
        font-size: 1.4em;
    }
    .about-imyme span.bold {
        font-size: 2.0em;
    }
    .about-imyme2 {
        background: url("../../assets/images/lp1/aboutimyme2.jpg") no-repeat center;
        background-size:  cover;
        margin-top: -4px;
    }
    .about-imyme2-mask {
        background: rgba(255,255,255,0.7);
        padding-bottom: 15%;
    }
    .about-imyme2 p.about-imyme2-txt {
        font-size: 1.6em;
        font-weight: bold;
        text-align: center;
        padding: 10% 0;
    }
    .about-imyme2 span {
        background: linear-gradient(transparent 60%, #ffff00 0%);
    }
    .about-imyme h5 {
        font-size: 2.2em;
        font-weight: 600;
        padding: 5% 0;
    }
    .triangle-pink {
        border-top: 10px solid #ff9da9;
    }
    .qanda h3 {
        padding: 3% 0;
    }
    .qanda-title {
        background-color: #e7f9fb;
    }
    .qanda-title p,
    .qanda-txt p {
        padding: 2% 8%;
    }
    .qanda-title p {
        font-weight: bold;
    }
    .line::before {
        content: "\A" ;
        white-space: pre ;
    }
    .footer-section {
        padding: 0 0 10% 0;
        color: #ffffff;
    }
    .copyright-txt {
        letter-spacing: 0.2em;
    }
    section.sakura {
        margin: 0;
    }
    .sakura-content {
        background-color: #ffffff;
        color: #565656;
    }
    .sakura-content h3 {
        font-size: 4.4vw;
        letter-spacing: .1em;
        font-weight: bold;
        text-align: center;
        padding: 4.0vw 0;
    }
    .sakura-content h2 {
        font-size: 4.4vw;
        font-weight: 500;
        letter-spacing: .15em;
        text-align: center;
        padding: 4.0vw 0;
    }
    .sakuraBarImg {
        width: 60vw;
        margin: 3.2vw auto;
        display: block;
    }
    .sakuraTopImg {
        width: 100%;
        display: block;
    }
    .sakura-content-introduction {
        width: 90vw;
        margin: 0 auto;
    }
    .sakurasmallImg {
        width: 40vw;
        height: 45vw;
        display: block;
    }
    .sakura-triangle {
        margin: 16px auto;
        width: 0;
        height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-top: 30px solid #F8DAE9;
    }
    .sakuraShizukuImg {
        width: 10vw;
    }
    .sakura-title {
        display: flex;
        align-items: center;
        justify-items: center;
    }
    .sakura-title span {
        margin-left: 8px;
        background: linear-gradient(transparent 75%, #F8DAE9 75%);
    }
    .sakura-feature {
        padding: 4.8vw 0 0 0;
    }
    .sakura-sub-title {
        margin: 5.6vw 0;
    }
    .sakura-sub-title h4 {
        position: relative;
        font-size: 4.0vw;
        font-weight: bold;
        padding:0.25em 1em;
        line-height: 6.2vw;
        display: flex;
        top:0;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .sakura-sub-title p {
        padding-top: 4.8vw;
    }
    .sakura-sub-title h4:before, .sakura-sub-title h4:after { 
        position: absolute;
        top: 0;
        content:'';
        width: 12px;
        height: 100%;
        display: inline-block;
    }
    .sakura-sub-title h4:before {
        border-left: solid 1px #D079A4;
        border-top: solid 1px #D079A4;
        border-bottom: solid 1px #D079A4;
        left: 0;
    }
    .sakura-sub-title h4:after {
        content: '';
        border-top: solid 1px #D079A4;
        border-right: solid 1px #D079A4;
        border-bottom: solid 1px #D079A4;
        right: 0;
    }
    .sakura-featurelist ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        padding-bottom: 4.2vw;
    }
    .sakura-featurelist h5 {
        font-size:4.0vw;
        font-weight: 800;
        padding-bottom: 4px;
    }
    .sakuraPointImg {
        padding-right: 2.1vw;
        width: 20vw;
    }
    .sakura-word {
        background-color: #F7E5E9;
        padding: 3.2vw;
    }
    a.sakura-btn {
        display: block;
        background-color: #FAA7B8;
        border-radius: 26px;
        font-size: 4.0vw;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        padding: 4vw 0;
        box-shadow: 0 4px 2px 0 rgb(0 0 0 / 10%);
    }
    a.sakura-btn span {
        border: 2px solid #ffffff;
        padding: 2vw 19vw;
        border-radius: 20px;
    }
    .sakura-fukidashi {
        display: flex;
    }
    .sakura-balloon {
        position: relative;
        display: inline-block;
        margin: 1.5em 0 1.5em 15px;
        padding: 7px 10px;
        min-width: 120px;
        max-width: 100%;
        font-size: 2.1vw;
        background: #FFF;
        border: solid 3px #FBE5F1;
        box-sizing: border-box;
        border-radius: 3px;
        height: 50%;
    }
    .sakura-balloon:before {
        content: "";
        position: absolute;
        top: 50%;
        left: -23px;
        margin-top: -12px;
        border: 12px solid transparent;
        border-right: 12px solid #FFF;
        z-index: 2;
    }
    .sakura-balloon:after {
        content: "";
        position: absolute;
        top: 50%;
        left: -30px;
        margin-top: -14px;
        border: 14px solid transparent;
        border-right: 14px solid #FBE5F1;
        z-index: 1;
    }
    .sakura-soap {
        margin-top: -10vw;
    }
    .sakuraSoapIconImg {
        width: 30vw;        
    }
    .sakura-soap-icon {
        top: 10vw;
        position: relative;
    }
    .sakuraSoapImg {
        width: 40vw;
        margin: 0 auto;
        display: block;
    }
    .sakura-soap-content {
        border:1px #EFAF70 dotted;
        border-radius: 4px;
        width: 80vw;
        display: block;
        margin: 0 auto;
        padding: 4.8vw;
    }
    .sakura-soap-content h4 {
        font-weight: 500;
        padding-bottom: 1.4vw;
        font-size: 4.2vw;
    }
</style>
