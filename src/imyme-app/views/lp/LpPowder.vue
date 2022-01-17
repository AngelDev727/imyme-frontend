<template>
    <div>
        <section class="powder-lp">
            <div id="page-top" v-scroll="handleScroll" style="opacity: 0; pointer-events: none" @click="handleClick">
                <a href="/product?id=c0ba32f2-9a22-43c0-be48-a4a621f4d5f7" class="lp1-btn-shiny lp1-btn-shiny2">20%OFFで単品を購入する</a>
            </div>
            <section class="lp-wrapper">
                <section>
                    <img src="@app/assets/images/powder-lp/powder-lp-top.png" alt="究極の美白パウダー" class="powderWideImg">
                </section>
                <section class="powder-lp-wrapper">                
                    <div class="powder-lp-title">
                        <h2><span class="blue-line">透き通る美肌になりたい人のための<br>“究極の美肌パウダー”</span></h2>
                    </div>    
                    <div class="powder-lp-discount">
                        <img src="@app/assets/images/powder-lp/powder-lp-product.png" alt="今なら10%OFF！" class="powderWideImg">
                        <div class="powder-lp-discount-price">
                            <p class="line2"><span class="border">¥6,380</span><span> (税込)</span></p>                            
                            <p>→</p>
                            <p class="red">¥5,104<span>(税込)</span></p>
                        </div>
                        <div class="powder-lp-discount-smalltxt">
                            <p>週1,2回のケアなら3ヶ月~半年間も使えるのでオススメです。</p>
                        </div>
                        <div class="powder-lp-discount-title-waku">
                            <h4>期間限定で20%OFF！</h4>
                        </div>
                        <div class="powder-lp-discount-txt">
                            <p>今なら、限定セットも販売中！</p>
                        </div>      
                        <img src="@app/assets/images/powder-lp/powder-lp-product02.png" alt="今なら、限定セットも販売中！" class="powderWideImg">                  
                        <div class="powder-lp-discount-txt">
                            <p>年々、肌の悩みが増えていませんか？</p>
                        </div>  
                        <img src="@app/assets/images/powder-lp/powder-lp-feature-banner.png" alt="年々、肌の悩みが増えていませんか？" class="powderWideImg">                  
                        <div class="powder-lp-feature">
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>フェイスラインがたるんできた</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>ファンデーションを塗ると帰って毛穴が目立つ</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>小じわでほうれい線が気になってきた</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>いくら保湿しても肌が乾燥してカサカサになる</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>頬に手が触れるとゴワゴワする</p>
                            </div>                                                                                                                
                        </div>  
                        <div class="powder-lp-feature-square">
                            <p>ブライトニングパウダーで<br>解決できます！</p>
                        </div>
                        <div class="powder-lp-feature-triangle"></div>
                        <div class="powder-lp-discount-smalltxt left-txt">
                            <p>スキンケアはもちろん、ライフスタイルやケア方法が肌悩みに影響している可能性も。imymeはスキンケアだけでなく肌ケア、ライフスタイルのご相談もお待ちしています。肌の魅力を取り戻して自信溢れるあなたになってください。</p>
                        </div>                     
                    </div>                
                </section>                
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-title">
                        <h2><span class="blue-line">究極の美肌パウダーとは？</span></h2>
                    </div>
                    <div class="powder-lp-txt">
                        <p>“肌の酸化”という言葉を聞かれたことがあると思います。肌の酸化は、一般的に老化と言われている現象で原因は活性酸素にあります。活性酸素が蓄積すると、それを無くそうとメラニンが増えてシミができたり、たるみ、シワ、くすみを引き起こして肌の老化も早めてしまいます。そんな、肌の酸化を防ぐのがビタミンCの還元作用です。ビタミンCが代わりに酸化されることにより、肌の酸化を予防してくれるのです。</p>
                        <p>imymeのブライトニングパウダーは、優良なビタミンC誘導体を究極の状態で肌に届けることができるので、キメを整えて透き通る肌へ導くための”究極の美肌パウダー”です。</p>
                    </div>
                    <div class="powder-lp-resaon">
                        <div class="powder-lp-resaon-box">
                            <div class="powder-lp-resaon-icon">
                                <img src="@app/assets/images/powder-lp/powder-lp-reason01.svg" alt="なぜ「究極の美肌パウダー」なの？" class="powderReasonIcon">
                            </div>
                            <div class="powder-lp-resaon-img">
                                <img src="@app/assets/images/powder-lp/powder-lp-reason01-img.png" alt="なぜ「究極の美肌パウダー」なの？" class="powderWideImg">
                            </div>
                            <div class="powder-lp-resaon-txt">
                                <h3>優良なビタミンCを新鮮に届ける</h3>
                                <div class="powder-lp-resaon-txtline"></div>
                                <p>ビタミンC誘導体と言っても種類は様々。ブライトニングパウダーに使用しているのは、従来のビタミンC誘導体に比べ、角質への浸透性が高いAPPS（アプレシエ）。今までAPPS配合の化粧品を使ってもなかなか効果が実感できなかったのは、配合量が低く、新鮮な状態で肌に届けられていなかったから。濃度を調整し、新鮮に肌へ届ける事ができるので、結果が違います。</p>
                            </div>
                        </div>
                    </div>
                    <div class="powder-lp-resaon">
                        <div class="powder-lp-resaon-box">
                            <div class="powder-lp-resaon-icon">
                                <img src="@app/assets/images/powder-lp/powder-lp-reason02.svg" alt="なぜ「究極の美肌パウダー」なの？" class="powderReasonIcon">
                            </div>
                            <div class="powder-lp-resaon-img">
                                <img src="@app/assets/images/powder-lp/powder-lp-reason02-img.png" alt="なぜ「究極の美肌パウダー」なの？" class="powderWideImg">
                            </div>
                            <div class="powder-lp-resaon-txt">
                                <h3>防腐剤/界面活性剤フリーで肌本来のはたらきをサポートする</h3>
                                <div class="powder-lp-resaon-txtline"></div>
                                <p>防腐剤や合成界面活性剤は化粧品の成分を安定させる役割として使用されていますが、肌の表皮に棲む常在菌のバランスや肌のバリア機能を崩す原因になっています。肌本来のはたらきを妨げないように、ブライトニングパウダーのAPPSは防腐剤フリーなので、イオン導入にもお使いいただけます。</p>
                            </div>
                        </div>
                    </div>
                    <div class="powder-lp-point">
                        <div class="powder-lp-point-box">
                            <span class="powder-lp-point-box-title">MESSAGE</span>
                            <p>10万人の肌研究の結果、肌本来のはたらきを引き出すスキンケアこそが長く美肌を保てるということがわかり、余計な成分を入れないシンプルな処方を大切にしてきました。それは、防腐剤、界面活性剤(乳化剤)など肌のはたらきを妨げる成分を使用しない、肌にあった成分で作るたった1アイテムのスキンケア。導入液、化粧水、乳液、美容液など複数のアイテムを使っても、それぞれの成分同士の化学反応は未知数で、保湿をしすぎても肌の働きを弱らせてしまうのです。<br>このブライトニングパウダーも、余計なものは入れないシンプルな処方で開発しました。紫外線に多く当たってしうまった時や、年齢に応じた肌悩みにはビタミンCを届けてあげるべきです。スペシャルケアや大切な用事の前にもぜひ使ってみてください。</p>
                            <img src="@app/assets/images/powder-lp/powder-lp-name.png" alt="署名" class="powderWideImg">
                        </div>
                    </div>           
                </section>
                <section>
                    <div class="powder-lp-vitamin-bg">
                        <img src="@app/assets/images/powder-lp/powder-lp-vitamin-bg.png" alt="肌の悩みにはやっぱりビタミンC" class="powderWideImg">
                    </div>
                    <div class="powder-lp-vitamin">
                        <div class="powder-lp-vitamin-box">
                            <div class="powder-lp-title">
                                <h2><span class="blue-line">肌の悩みにはやっぱりビタミンC</span></h2>
                            </div>
                            <p class="txt-center">食べ物から取ってあげることも、肌へ届けてあげることも両方大事です。</p>
                            <div class="powder-lp-vitamin-box-txt">
                                <h3>最優良*のビタミンC誘導体を配合！</h3>
                                <p>ビタミンC誘導体には大きく3種類あり、水溶性、脂溶性、両性の性質を持つ進化型があります。究極の美肌パウダーでは、即効性があり、浸透性、持続性の高いAPPS(アプレシエ)という進化型のビタミンC誘導体を使っています。<span class="txt-small">※水溶性、脂溶性の両性を含むビタミンC誘導体として</span></p>
                            </div>
                            <div class="powder-lp-vitamin-explain">
                                <div class="powder-lp-vitamin-explain-small">
                                    <div class="powder-lp-vitamin-explain-small-box">
                                        <h5>水溶性</h5>
                                        <p>即効性はあるが劣化が早く浸透性が弱い。</p>
                                    </div>
                                    <div class="powder-lp-vitamin-explain-small-box">
                                        <h5>脂溶性</h5>
                                        <p>即効性は低いが持続性、浸透性が高い。</p>
                                    </div>                                    
                                </div>
                                <div class="powder-lp-vitamin-explain-middium">
                                    <p>水溶性・脂溶性の良いところだけを抽出！</p>
                                </div>
                                <div class="powder-lp-vitamin-explain-triangle"></div>
                                <div class="powder-lp-vitamin-explain-big">
                                        <h5>進化型</h5>
                                        <p>水溶性、脂溶性の両方の性質を持つ。<br>即効性があり、持続性、浸透性が高い。</p>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="powder-lp-vitamin-triangle"></div>
                </section>
                <section class="powder-lp-wrapper-gray">
                    <div class="powder-lp-formulation">
                        <div class="powder-lp-title">
                            <h2><span class="blue-line">ブライトニングパウダーに<br>配合されているビタミンCは？</span></h2>
                        </div>
                        <div class="powder-lp-formulation-list">
                            <div class="powder-lp-formulation-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-formulation01.png" alt="他のビタミンよりも濃く浸透する！" class="powderWideImg">
                                <h3>他のビタミンよりも濃く浸透する！</h3>
                                <p>一般的に使用されているビタミンC誘導体(アスコルビン酸2-グルコシド)と比較すると、18時間たったあとでも4倍以上の浸透性を確認できました。</p>
                            </div>
                        </div>
                        <div class="powder-lp-formulation-list">
                            <div class="powder-lp-formulation-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-formulation02.png" alt="コラーゲンの合成促進される！" class="powderWideImg">
                                <h3>コラーゲンの合成が促進される！</h3>
                                <p>72時間後のコラーゲン合量を定量すると、一般的なビタミンC誘導体(アスコルビン酸2-グルコシド)の5倍以上もI型コラーゲン量が増加していることがわかりました。</p>
                            </div>
                        </div>
                        <div class="powder-lp-formulation-list">
                            <div class="powder-lp-formulation-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-formulation03.png" alt="抗しわ効果の評価も！" class="powderWideImg">
                                <h3>抗しわ効果の評価も！</h3>
                                <p>ブライトニングパウダーに含まれるビタミンC誘導体(APPS)を1日に2度、1~3ヶ月間、21名の女性に利用してもらった結果、皮膚科医の指導下で抗しわ効果が認められました。</p>
                            </div>
                        </div>   
                        <p><span class="small">参照元：昭和電工株式会社公式HP</span></p>                                           
                    </div>
                    <div class="powder-lp-point-triangle"></div>
                </section>
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-title top-padding">
                        <h2><span class="blue-line">美肌を長く保つためには肌自身に働いてもらう環境を作ること！</span></h2> 
                    </div>
                 </section>
                 <section>
                     <img src="@app/assets/images/powder-lp/powder-lp-hands.png" alt="美肌を長く保つためには肌自身に働いてもらう環境を作ること！" class="powderWideImg">
                 </section>
                 <section class="powder-lp-wrapper top-padding bottom-padding">
                     <p>効果的な成分が配合されても、他の成分が肌の働きを邪魔してしまっては素肌を美しく保つことはできません。界面活性剤や防腐剤を使っていては肌に負担がかかり、肌のはたらきも弱めてしまいます。imymeのブライトニングパウダーは肌に届けたい成分だけをパウダーにしています。そのため、パウダーを精製水と混ぜるときに混ざりにくいかもしれません。界面活性剤が入っていなければ、パウダーと液体が混ざりにくいのは自然なことです。混ざりやすくするために不要な成分を入れるなら、少し混ぜにくくても肌に良いものを届けて欲しいのです。</p>
                    <div class="powder-lp-enviroment">
                        <h3>その結果、嬉しいお声を続々と<br>いただいております！</h3>
                    </div>
                    <div class="powder-lp-enviroment-triangle"></div>
                    <div class="powder-lp-enviroment-triangle"></div>
                </section>
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-case">
                        <div class="powder-lp-case-title">
                            <h3><p class="powder-lp-case-title-icon"><img src="@app/assets/images/powder-lp/powder-lp-case01.svg" alt="80%の方が効果実感！" class="caseIconImg"></p><span>80%の方が効果実感！</span></h3>
                        </div>
                        <div class="powder-lp-case-txt">
                            <p>使用した80%の方が、肌が明るくなった、毛穴が目立たなくなったなど肌の変化を実感されています。　　(モニター：25~65歳女性20名)</p>
                        </div>
                        <div class="powder-lp-case-list">
                            <div class="powder-lp-case-box">
                                <div class="powder-lp-case-box-img">
                                    <img src="@app/assets/images/powder-lp/powder-lp-case01-img.png" alt="美肌を長く保つためには肌自身に働いてもらう環境を作ること！" class="powderVoiceImg">
                                </div>
                                <div class="powder-lp-case-box-content">
                                    <div class="powder-lp-case-box-label">
                                        <span>VOICE.1</span>
                                    </div>
                                    <div class="powder-lp-case-box-txt">
                                        <p>透明感がまして、細かいシミが薄くなってきました。</p>
                                        <div class="powder-lp-case-box-bar"></div>
                                        <p>30代後半 乾燥肌</p>
                                    </div>
                                </div>
                            </div>
                            <div class="powder-lp-case-box">
                                <div class="powder-lp-case-box-content">
                                    <div class="powder-lp-case-box-label">
                                        <span>VOICE.2</span>
                                    </div>
                                    <div class="powder-lp-case-box-txt">
                                        <p>お肌がワントーン明るくなり、黒ずみ毛穴も目立たなくなった！</p>
                                        <div class="powder-lp-case-box-bar"></div>
                                        <p>20代後半 女性</p>
                                    </div>
                                </div>                                
                                <div class="powder-lp-case-box-img">
                                    <img src="@app/assets/images/powder-lp/powder-lp-case02-img.png" alt="美肌を長く保つためには肌自身に働いてもらう環境を作ること！" class="powderVoiceImg">
                                </div>
                            </div>
                            <div class="powder-lp-case-box">
                                <div class="powder-lp-case-box-img">
                                    <img src="@app/assets/images/powder-lp/powder-lp-case03-img.png" alt="美肌を長く保つためには肌自身に働いてもらう環境を作ること！" class="powderVoiceImg">
                                </div>
                                <div class="powder-lp-case-box-content">
                                    <div class="powder-lp-case-box-label">
                                        <span>VOICE.3</span>
                                    </div>
                                    <div class="powder-lp-case-box-txt">
                                        <p>化粧品による肌へのストレスが全く無く、肌の調子や化粧ノリが良い、美白も期待できるので日常的に使用したい。</p>
                                        <div class="powder-lp-case-box-bar"></div>
                                        <p>30代前半 敏感肌</p>
                                    </div>
                                </div>
                            </div>
                            <div class="powder-lp-case-box">
                                <div class="powder-lp-case-box-content">
                                    <div class="powder-lp-case-box-label">
                                        <span>VOICE.4</span>
                                    </div>
                                    <div class="powder-lp-case-box-txt">
                                        <p>使った後は肌がさらさらして良かったです。私の場合は毛穴に効き目がありそうです。</p>
                                        <div class="powder-lp-case-box-bar"></div>
                                        <p>40代後半 混合肌 OL</p>
                                    </div>
                                </div>                                
                                <div class="powder-lp-case-box-img">
                                    <img src="@app/assets/images/powder-lp/powder-lp-case04-img.png" alt="美肌を長く保つためには肌自身に働いてもらう環境を作ること！" class="powderVoiceImg">
                                </div>
                            </div>                                                                                    
                        </div>
                    </div>
                    <div class="powder-lp-case">
                        <div class="powder-lp-case-title">
                            <h3><p class="powder-lp-case-title-icon"><img src="@app/assets/images/powder-lp/powder-lp-case02.svg" alt="頻度と効果は？" class="caseIconImg"></p><span>頻度と効果は？</span></h3>
                        </div>
                        <div class="powder-lp-case-txt">
                            <p>週に1,2回のケアとして使っていた人がほとんど。1ヶ月後にはほとんどの方が肌の変化を体感されています。</p>
                        </div>    
                        <div class="powder-lp-case-graph">
                            <div class="powder-lp-case-graph-box">
                                <h5>使用頻度</h5>
                                <img src="@app/assets/images/powder-lp/powder-lp-graph01.svg" alt="使用頻度" class="graphIconImg">
                            </div>
                            <div class="powder-lp-case-graph-box">
                                <h5>効果を感じた時</h5>
                                <img src="@app/assets/images/powder-lp/powder-lp-graph02.svg" alt="効果を感じた時" class="graphIconImg">
                            </div>                            
                        </div>                    
                    </div>      
                    <div class="powder-lp-case">
                        <div class="powder-lp-case-title">
                            <h3><p class="powder-lp-case-title-icon"><img src="@app/assets/images/powder-lp/powder-lp-case03.svg" alt="どんな悩みが改善された？" class="caseIconImg"></p><span>どんな悩みが改善された？</span></h3>
                        </div>
                        <div class="powder-lp-case-txt">
                            <p>改善された肌悩みランキング！1ヶ月使用した状態だと、肌のトーンアップや毛穴に効果があった方が多いようでした！</p>
                        </div> 
                        <div class="powder-lp-case-ranking">
                            <div class="powder-lp-case-ranking-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-ranking01.svg" alt="頻度と効果は？" class="rankingIconImg">
                                <p>シミ(くすみ)、肌のトーンアップ<span>81.0%</span></p>
                            </div>
                            <div class="powder-lp-case-ranking-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-ranking02.svg" alt="頻度と効果は？" class="rankingIconImg">
                                <p>毛穴(開き、黒ずみ)<span>56.0%</span></p>
                            </div>
                            <div class="powder-lp-case-ranking-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-ranking03.svg" alt="頻度と効果は？" class="rankingIconImg">
                                <p>エイジング(シワ、シミ、たるみ全て)<span>19.0%</span></p>
                            </div>                                                        
                        </div>
                        <div class="powder-lp-case-txt">
                            <p>他にも、キメが細かくなった、定期的な肌トラブルがなくなった、乾燥しなくなったなども嬉しいお声をいただいています。日常的にお肌の調子を整えたい方は、週1,2回のスペシャルケアとしてお使いください。</p>
                        </div>                                               
                    </div>                                        
                </section>
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-title">
                        <h2><span class="blue-line">透き通る美肌になりたい人のための<br>“究極の美肌パウダー”</span></h2>
                    </div>    
                    <div class="powder-lp-discount">
                        <div class="powder-lp-discount-title">
                            <h4>今なら20%OFF！</h4>
                        </div>
                        <img src="@app/assets/images/powder-lp/powder-lp-product.png" alt="今なら20%OFF！" class="powderWideImg">
                        <div class="powder-lp-discount-price">
                            <p class="line2"><span class="border">¥6,380</span><span> (税込)</span></p>                    
                            <p>→</p>
                            <p class="red">¥5,104<span>(税込)</span></p>
                        </div>
                        <div class="powder-lp-discount-smalltxt">
                            <p>週1,2回のケアなら3ヶ月~半年間も使えるのでオススメです。</p>
                        </div>
                        <div class="powder-lp-discount-title-waku">
                            <h4>期間限定で20%OFF！</h4>
                        </div>
                        <div class="powder-lp-discount-txt">
                            <p>今なら、限定セットも販売中！</p>
                        </div>      
                        <img src="@app/assets/images/powder-lp/powder-lp-product02.png" alt="今なら、限定セットも販売中！" class="powderWideImg">                  
                        <div class="powder-lp-discount-txt">
                            <p>年々、肌の悩みが増えていませんか？</p>
                        </div>  
                        <img src="@app/assets/images/powder-lp/powder-lp-feature-banner.png" alt="年々、肌の悩みが増えていませんか？" class="powderWideImg">                  
                        <div class="powder-lp-feature">
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>フェイスラインがたるんできた</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>ファンデーションを塗ると帰って毛穴が目立つ</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>小じわでほうれい線が気になってきた</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>いくら保湿しても肌が乾燥してカサカサになる</p>
                            </div>
                            <div class="powder-lp-feature-box">
                                <img src="@app/assets/images/powder-lp/powder-lp-checkmark.svg" alt="今なら、限定セットも販売中！" class="powderCheckImg"><p>頬に手が触れるとゴワゴワする</p>
                            </div>                                                                                                                
                        </div>  
                        <div class="powder-lp-feature-square">
                            <p>ブライトニングパウダーで<br>解決できます！</p>
                        </div>
                        <div class="powder-lp-feature-triangle"></div>
                        <div class="powder-lp-discount-smalltxt left-txt">
                            <p>スキンケアはもちろん、ライフスタイルやケア方法が肌悩みに影響している可能性も。imymeはスキンケアだけでなく肌ケア、ライフスタイルのご相談もお待ちしています。肌の魅力を取り戻して自信溢れるあなたになってください。</p>
                        </div>
                        <div class="powder-lp-discount-txt left-txt">
                            <p>例えば...</p>
                        </div>   
                        <div class="powder-lp-qa">
                            <div class="powder-lp-qa-box">
                                <div class="powder-lp-qa-box-label">
                                    <h4>Q</h4>
                                </div>
                                <div class="powder-lp-qa-box-txt">
                                    <h5>ハリは出てきたけど、<br>たるみはどう予防すれば良いの？</h5>
                                </div>                                                                 
                            </div>
                            <div class="powder-lp-qa-box">  
                                <div class="powder-lp-qa-box-label">
                                    <h4>A</h4>
                                </div>
                                <div class="powder-lp-qa-box-txt">
                                    <p>たるみは、スキンケアではなく姿勢の方が大切です！顔の肌は頭から背中まで1枚でつながっています。そのため、猫背の人ほど背中の余った皮膚がたるみ、顔に影響が出てしまうのです。椅子に座ることが多い方は、骨盤を立てることを意識して姿勢を整える習慣をつけてみてください！たるみが徐々に改善されてくるかと思います。</p>
                                </div>                                                                
                            </div>                            
                        </div>                      
                    </div>                
                </section>
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-title">
                        <h2><span class="blue-line">究極の美肌パウダー2つの使い方！</span></h2>
                    </div>
                    <div class="powder-lp-face">
                        <img src="@app/assets/images/powder-lp/powder-lp-face.png" alt="究極の美肌パウダー2つの使い方！" class="powderWideImg">
                    </div>
                    <div class="powder-lp-face-detail">
                        <div class="powder-lp-face-detail-img">
                            <img src="@app/assets/images/powder-lp/powder-lp-face02.png" alt="究極の美肌パウダー2つの使い方！" class="powderCaseImg">
                        </div>
                        <div class="powder-lp-face-detail-txt">
                            <h4>パックにしても<br>直接肌に塗ってもOK！</h4>  
                        </div>
                    </div>
                    <div class="powder-lp-face-txt">
                        <p>パウダーを精製水orセラムに混ぜたら、パックにしても直接肌に塗ってもOKです！乾燥肌の方は精製水が蒸発しやすいのでパックがオススメ特に湿度の低い冬、乾燥が気になる方は美肌パウダーを塗った後にセラムを塗ってあげるのがオススメです。乾燥肌でない方は美肌パウダーだけで十分です。</p>
                    </div>
                </section>    
                <section class="powder-lp-wrapper">
                    <div class="powder-lp-title">
                        <h2><span class="blue-line">作り方は簡単！</span></h2>
                    </div>
                    <div class="powder-make-txt">
                        <p class="txt-center">※直接塗る場合は2で終わりです。</p>
                    </div> 
                    <div class="powder-make">
                        <div class="powder-make-box">
                            <div class="powder-make-box-label">
                                <h4>STEP<br>1</h4>
                            </div>
                            <div class="powder-make-box-img">
                                <img src="@app/assets/images/powder-lp/powder-lp-step01.svg" alt="付属のカップに精製水を10ml入れる" class="powderCaseImg">
                                <p>付属のカップに精製水を10ml入れる</p>
                            </div>
                        </div>
                        <div class="powder-make-box">
                            <div class="powder-make-box-label">
                                <h4>STEP<br>2</h4>
                            </div>
                            <div class="powder-make-box-img">
                                <img src="@app/assets/images/powder-lp/powder-lp-step02.svg" alt="付属のスプーン1杯分を入れて混ぜる" class="powderCaseImg">
                                <p>付属のスプーン1杯分を入れて混ぜる</p>
                            </div>
                        </div>   
                        <div class="powder-make-box">
                            <div class="powder-make-box-label">
                                <h4>STEP<br>3</h4>
                            </div>
                            <div class="powder-make-box-img">
                                <img src="@app/assets/images/powder-lp/powder-lp-step03.svg" alt="パックを入れて、浸されたら出来上がり！" class="powderCaseImg">
                                <p>パックを入れて、浸されたら出来上がり！</p>
                            </div>
                        </div>    
                        <div class="powder-lp-enviroment">
                                <h3>究極の美肌パウダーが<br>今だけキャンペーン中！</h3>
                        </div>
                        <div class="powder-lp-enviroment-triangle"></div>
                        <div class="powder-lp-enviroment-triangle"></div>                                                                                                 
                    </div>                   
                </section>  
                <section class="powder-lp-wrapper">   
                    <div class="powder-lp-discount">
                        <div class="powder-lp-discount-title">
                            <h4>今なら2O%OFF！</h4>
                        </div>
                        <img src="@app/assets/images/powder-lp/powder-lp-product.png" alt="今なら20%OFF！" class="powderWideImg">
                        <div class="powder-lp-discount-price">
                            <p class="line2"><span class="border">¥6,380</span><span> (税込)</span></p>                          
                            <p>→</p>
                            <p class="red">¥5,104<span>(税込)</span></p>
                        </div>
                        <div class="powder-lp-discount-smalltxt">
                            <p>週1,2回のケアなら3ヶ月~半年間も使えるのでオススメです。</p>
                        </div>
                        <a href="/product?id=c0ba32f2-9a22-43c0-be48-a4a621f4d5f7" class="btn-square-slant">20%OFFで究極の<br>美肌パウダーを購入する</a>                        
                        <div class="powder-lp-discount-title-waku">
                            <h4>期間限定で20%OFF！</h4>
                        </div>
                        <div class="powder-lp-discount-txt">
                            <p>今なら、限定セットも販売中！</p>
                        </div>      
                        <img src="@app/assets/images/powder-lp/powder-lp-product02.png" alt="今なら、限定セットも販売中！" class="powderWideImg">                                     
                        <div class="powder-make-txt">
                            <p>洗顔～スペシャルケアまで全て揃う！あなたの肌にぴったりのオールインワンセラムと究極の美肌パウダーで一気に透き通るキメ肌を手に入れたい方は超お得なトータルケアセットです。</p>
                        </div>
                        <a href="/survey/1" class="btn-square-slant">まずは肌診断をしてみる</a>
                    </div>                
                </section>                                              
            </section>
        </section>
    </div>
</template>
<script>
    import {Vue, Component} from 'vue-property-decorator'
    @Component
    export default class LpPowder extends Vue {     
        //mimic the show hide button from j-query
        handleScroll(evt, el) {
            if (window.scrollY > 600) {
                el.setAttribute('style', 'opacity: 1;')
            } else {
                el.setAttribute('style', 'opacity: 0; pointer-events: none')
            }
        }        
    }
</script>
<style>
section {
    margin: 0;
    background-color: #ffffff;
}
/*全体*/
* {
    color: #757474;
}
#page-top {
    position: fixed;
    bottom: 20px;
    z-index: 999999;
    width: 100%;
    transition: opacity 300ms ease;
}
h2 {
    font-size: 22px;
    letter-spacing: .15em;
    font-weight: bold;
}
h3 {
    font-size: 18px;
    letter-spacing: .15em;
    font-weight: bold;
    text-align: left;
}
p {
    font-size: 12px;
    letter-spacing: .15em;
}
nav.navbar {
    display: none;
}
.powder-lp {
    background-color: #f1f1f1;
    padding-bottom: 120px;
}
.lp-wrapper {
    width: 640px;
    margin: 0 auto;
    padding-bottom: 48px;    
}
.powder-lp-wrapper {
    width: 540px;
    margin: 0 auto;
}
.powder-lp-wrapper-gray {
    background-color: #f6f6f6;
}
p.txt-center {
    text-align: center;
}
span.txt-small {
    font-size: 8px;
}
p span.small {
    text-align: right;
    display: block;
    font-size: 10px;
}
.top-padding {
    padding-top: 48px;
}
.bottom-padding {
    bottom-top: 48px;
}
/**購買ボタン */
a.lp1-btn-shiny {
    color: white;
    letter-spacing: .2em;
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
.lp1-btn-shiny2 {
    background-image:-webkit-gradient(
            linear,left top,left bottom,
            from(#edce8f),
            to(#E9C173));    
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
.top-btn {
    margin-bottom: 7.2vw;
}
/*画像*/
.powderWideImg {
    width: 100%;
    display: block;
}
.powderReasonIcon {
    width: 120px;
    display: block;
}
.caseIconImg {
    width: 30px;
    margin: 0 24px;
}
.powderCaseImg {
    width: 140px;
    display: block;
    margin: 0 auto;
}
.powderCheckImg {
    width: 40px;
    display: block;
    margin-right: 4vw;
}
.powderVoiceImg {
    width: 140px;
    display: block;
    margin: 0 auto;  
}
.graphIconImg {
    width: 200px;
    display: block;
}
.rankingIconImg {
    width: 100px;
    display: block;    
    margin-right: 24px;
}
/*タイトル*/
.powder-lp-title h2 {
    position: relative;
    margin: 0 0 24px;
    padding: 0.5em 0.5em 0.5em 1.7em;

}
.powder-lp-title h2:before {
    content: "";
    position: absolute;
    background: #87C2C4;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    transform: rotate(40deg);
    -moz-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
}
.powder-lp-title h2:after {
    content: "";
    position: absolute;
    background:#87C2C4;
    top: 1.4em;
    left: 1vw;
    height: 12px;
    width: 12px;
    transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
    -o-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
}
span.blue-line {
    background:rgba(0, 0, 0, 0) linear-gradient(transparent 70%, #E8F7E7 0%) repeat scroll 0 0;
}
.powder-lp-txt{
    padding: 3.8vw 0;
}
/*理由 */
.powder-lp-resaon {
    padding: 24px 0;
}
.powder-lp-resaon-box {
    position: relative;
}
.powder-lp-resaon-icon {
    top: -20px;
    position: absolute;
}
.powder-lp-resaon-txt {
    padding: 24px 0;
}
.powder-lp-resaon-txtline {
    width: 100%;
    height: 1px;
    background-color: #B9B9B9;
    margin: 12px 0;
}
/*point */
.powder-lp-point-box {
    position: relative;
    margin: 0;
    padding: 24px;
    border: solid 2px #87C2C4;
    border-radius: 8px;
}
.powder-lp-point-box-title {
    position: absolute;
    display: inline-block;
    top: -13px;
    left: 10px;
    padding: 0 9px;
    line-height: 1;
    font-size: 22px;
    letter-spacing: .2em;
    background: #FFF;
    color: #87C2C4;
    font-weight: bold;
}
.powder-lp-point-box-title p {
    margin: 0; 
    padding: 24px;
}
/*vitamin */
.powder-lp-vitamin{
    background-color: #DCE5E5;
    height: 650px;
}
.powder-lp-vitamin-bg {
    margin-top: 48px;
}
.powder-lp-vitamin-box {
    background-color: #ffffff;
    width: 580px;
    padding: 48px 40px;
    margin: 0 auto;
    top: -240px;
    position: relative;
}
.powder-lp-vitamin-box-txt {
    padding: 24px 0;
}
.powder-lp-vitamin-box-txt h3 {
    padding-bottom: 24px;
}
.powder-lp-vitamin-explain-small {
    display: flex;
}
.powder-lp-vitamin-explain-small-box {
    border: 1px solid #b7b7b7;
    border-radius: 4px;
    width: 240px;
    padding: 16px;
}
.powder-lp-vitamin-explain-small-box h5 {
    font-weight: bold;
    text-align: center;
    padding-bottom: 12px;
}
.powder-lp-vitamin-explain-small-box:nth-child(1) {
    margin-right: 10px;
}
.powder-lp-vitamin-explain-small-box:nth-child(2) {
    margin-left: 10px;
}
.powder-lp-vitamin-explain-middium {
    background-color: #87C2C4;
    padding: 8px;
    border-radius: 8px;
    margin: 24px 0;
}
.powder-lp-vitamin-explain-middium p {
    color: #ffffff;
    font-weight: bold;
    text-align: center;
}
.powder-lp-vitamin-explain-triangle {
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-top: 30px solid #87C2C4;
    margin: 0 auto;
}
.powder-lp-vitamin-explain-big {
    border: 1px solid #87C2C4;
    border-radius: 8px;
    padding: 24px;
    margin-top: 24px;
}
.powder-lp-vitamin-explain-big h5 {
    font-weight: bold;
    padding-bottom: 8px;
}
.powder-lp-vitamin-explain-big h5,
.powder-lp-vitamin-explain-big p {
    color: #87C2C4;
    text-align: center;
}
.powder-lp-vitamin-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10vh 50vw 0 50vw;
  background-color: #f6f6f6;
  border-color: #DCE5E5 transparent transparent transparent;
}
/*配合 */
.powder-lp-formulation {
    padding: 48px 0;
    width: 560px;
    margin: 0 auto;
}
.powder-lp-formulation-list {
    display: flex;
    flex-direction: column;
}
.powder-lp-formulation-box {
    border:1px #C7C7C7 solid;
    background-color: #ffffff;
    padding:24px;
    border-radius: 8px;
    margin-bottom: 24px;
}
.powder-lp-formulation-box h3 {
    padding: 12px 0;
}
.powder-lp-point-triangle {
width: 0;
  height: 0;
  border-style: solid;
  border-width: 10vh 50vw 0 50vw;
  background-color: #ffffff;
  border-color: #f6f6f6 transparent transparent transparent;
}
/*環境 */
.powder-lp-enviroment h3 {
    text-align: center;
    padding: 48px 0;
}
.powder-lp-enviroment-triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid #87C2C4;
    margin: 24px auto;
}
/*case */
p.powder-lp-case-title-icon:after {
    content: "";
    height: 7vw;
    width: 1px;
    position: absolute;
    margin-right: 8px;
    margin-left: 8px;
    background-color: #b7b7b7;
}
.powder-lp-case-title h3 {
    border-bottom: 1px solid #b7b7b7;
    border-top: 1px solid #b7b7b7;
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 24px 0;
}
.powder-lp-case-title span {
    margin-left: 48px;
}
.powder-lp-case-txt {
    padding: 24px 0;
}
.powder-lp-case-box {
    display: flex;
    justify-content: space-between;
    border:1px solid #b7b7b7;
    border-radius: 4px;
    align-items: center;
    padding: 24px 24px 16px 24px;
    margin-bottom: 48px;
}
.powder-lp-case-box-img {
    width:40%;
}
.powder-lp-case-box-content {
    width:60%;    
}
.powder-lp-case-box-bar {
    width: 100%;
    height: 1px;
    background-color: #b7b7b7;
    margin: 8px 0;
}
.powder-lp-case-box-label {
    margin-bottom: 8px;
}
.powder-lp-case-box-label span {
    width: 160px;
    background-color: #87C2C4;
    color: #ffffff;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: .2em;
    border-radius: 4px;
    padding: 4px 8px;
}
.powder-lp-case-graph {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    justify-items: center;
    margin-bottom: 48px;
}
.powder-lp-case-graph-box h5 {
    font-weight: bold;
    margin-bottom: 24px;
}
.powder-lp-case-graph-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}
.powder-lp-case-ranking-box {
    display: flex;
    justify-content: flex-start;
    justify-items: center;
    align-items: center;
    border:1px solid #b7b7b7;    
}
.powder-lp-case-ranking-box {
    width: 100%;
    margin-bottom: 24px;
}
.powder-lp-case-ranking-box p {
    font-weight: bold;
}
.powder-lp-case-ranking-box span {
    font-size: 10px;
    margin-left: 8px;
}
/*discount */
.powder-lp-discount-title h4 {
    color: #ffffff;
    letter-spacing: .1em;
    font-weight: bold;
    text-align: center;
}
.powder-lp-discount-title {
    background-color: #E9C173;
    padding: 24px;
    width: 100%;
    margin-bottom: 24px;
}
.powder-lp-discount-title-waku {
    border:2px solid #E9C173;
    padding: 24px;
    width: 100%;
    margin:24px 0;
}
.powder-lp-discount-title-waku h4 {
    color: #E9C173;
    letter-spacing: .1em;
    font-weight: bold;
    text-align: center;
}
.powder-lp-discount-price {
    display: flex;
    justify-content: center;
    padding: 24px 0;
}
.powder-lp-discount-price p {
    font-size: 18px;
    margin-right: 24px;
}
.powder-lp-discount-price span {
    font-size: 10px;
}
.powder-lp-discount-price p:nth-child(3) {
    margin-right: 0;
}
.powder-lp-discount-price p.red {
    color: #B92828;
}
.powder-lp-discount-price p.line2 span.border {
    text-decoration: line-through;
    font-size: 18px;
}
.powder-lp-discount-price p.line2 span {
    text-decoration: none;
}
.powder-lp-discount-smalltxt {
    padding-bottom: 48px;
}
.powder-lp-discount-smalltxt p {
    text-align: center;
}
.powder-lp-discount-txt p {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding: 24px 0;
}
.powder-lp-feature {
    display: flex;
    flex-direction: column;
}
.powder-lp-feature-box {
    padding: 16px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-items: center;
}
.powder-lp-feature-box:nth-child(5) {
    margin-bottom: 0;
}
.powder-lp-feature-box p {
    text-align: center;
    letter-spacing: .3em;
    font-size: 14px;
    font-weight: bold;
}
.powder-lp-feature-square {
    background-color: #87C2C4;
    padding: 40px;
    margin-top:40px;
}
.powder-lp-feature-square p {
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    font-size: 24px;
}
.powder-lp-feature-triangle {
    border-top: 40px solid #87C2C4;
    border-right: 270px solid transparent;
    border-left: 270px solid transparent;
    margin-bottom: 48px;
}
.left-txt p {
    text-align: left;
}
/*q and a */
.powder-lp-qa {
    margin-bottom: 48px;
}
.powder-lp-qa-box {
    display: flex;
    margin-bottom: 12px;
}
.powder-lp-qa-box-label {
    border:1px solid #b7b7b7;
    padding: 16px;
    width: 60px;  
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;   
}
.powder-lp-qa-box-txt {
    border:1px solid #b7b7b7;
    padding: 24px;   
    margin-left: 8px;  
    width: 490px;
}
.powder-lp-face-detail {
    background-color: #87C2C4;
    padding: 24px;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
}
.powder-lp-face-detail-img {
    padding-right: 24px;
}
.powder-lp-face-detail-txt {
    padding-left: 24px;
}
.powder-lp-face-detail-txt h4 {
    color: #ffffff;
    font-weight: bold;
}
.powder-lp-face-txt {
    padding: 48px 0;
}
/*作り方 */
.powder-make-txt {
    padding: 24px 0;
}
.powder-make-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-items: center;
    margin-bottom: 24px;
}
.powder-make-box-label {
    border:1px solid #87C2C4;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    padding: 8px 24px;
    height: 200px;
}
.powder-make-box-label h4 {
    text-align: center;
    color: #87C2C4;
}
.powder-make-box-img {
    padding-left: 64px;
}
/**ボタン */
.btn-square-slant {
  display: inline-block;
  position: relative;
  padding: 24px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  background:#ffffff;
  border-top: solid 1px #606060;
  border-left: solid 1px #606060;
  border-bottom: solid 5px #606060;
  border-right: solid 5px #606060;
}
a.btn-square-slant {
    color: #606060;
    font-size: 18px;
    letter-spacing: .2em;
    font-weight: bold;
}
.btn-square-slant:before {  
  content: " ";
  position: absolute;
  bottom: -5px;
  left: -1px;
  width: 0;
  height: 0;
  border-width: 0 6px 6px 0px;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #FFF;
}

.btn-square-slant:after {  
  content: " ";
  position: absolute;
  top: -1px;
  right: -5px;
  width: 0;
  height: 0;
  border-width: 0px 6px 6px 0px;
  border-style: solid;
  border-color: #FFF;
  border-bottom-color: transparent;
}

.btn-square-slant:active {
  /*ボタンを押したとき*/
  border:none;
  -webkit-transform: translate(6px,6px);
  transform: translate(6px,6px);
}

.btn-square-slant:active:after, .btn-square-slant:active:before {
  content: none;/*ボタンを押すと線が消える*/
}
@media screen and (max-width: 640px) {
    /*全体*/
    .lp-wrapper {
        width: 100vw;
    }
    .powder-lp-wrapper {
        width: 92vw;
    } 
    .powder-lp-feature-triangle {
        border-top: 10vw solid #87C2C4;
        border-right: 45vw solid transparent;
        border-left: 45vw solid transparent;
        margin-bottom: 4vw;
    }
    h2 {
        font-size: 4.2vw;
    }
    h3 {
        font-size: 3.8vw;
        letter-spacing: .15em;
        font-weight: bold;
        text-align: left;
    }
    p {
        font-size: 12px;
        line-height: 2.2em;
        letter-spacing: .15em;
    }
    .powder-lp-title h2:after {
        height: 3vw;
        width: 3vw;
    }    
    .powder-lp-title h2:before {
        height: 4.5vw;
        width: 4.5vw;
    }
    .powder-lp-title h2:after {
        top: 1.8em;
    }
    .powder-lp-title h2 {
        padding: 0.5em 0.5em 0.5em 1.2em;
    }
    /*画像*/
    .graphIconImg {
        width: 40vw;
    }
    .powderReasonIcon {
        width: 28vw;
    }
    .powderVoiceImg {
        width: 24vw;        
    }
    .powderCaseImg {
        width: 40vw;
    }
    .rankingIconImg {
        width: 20vw;
        margin-right: 3.2vw;
    }
    .powderCheckImg {
        width: 4vw;
    }
    /*理由*/    
    .powder-lp-resaon-txtline {
        margin: 2.1vw 0;
    }
    /*ビタミン*/  
    .powder-lp-vitamin-box {
        width: 90vw;
        padding: 5.2vw 4.0vw;
    }  
    .powder-lp-vitamin-box-txt {
        padding: 3.2vw 0;
    }  
    .powder-lp-vitamin-explain-small-box {
        padding: 2.1vw;
    }
    .powder-lp-vitamin-explain-small-box:nth-child(1) {
        margin-right: 2.1vw;
    }
    .powder-lp-vitamin-explain-small-box:nth-child(2) {
        margin-left: 2.1vw;
    }    
    .powder-lp-vitamin {
        height: 160vw;
    }
     /*配合*/ 
    .powder-lp-formulation {
        width: 92vw;
    }   
    .powder-lp-formulation-box {
        padding: 4.2vw;
    }
     /*case*/     
    .powder-lp-case-box {
        padding: 4.8vw 3.8vw;
        margin-bottom: 2.4vw;
    }
    .powder-lp-case-box:nth-child(4) {
        margin-bottom: 6.4vw;
    }
    .powder-lp-case-box-img {
        width: 30%;
    }
    .powder-lp-case-txt {
        padding: 3.2vw 0 5.6vw 0;
    }
    .powder-lp-case-ranking-box {
        margin-bottom: 3.2vw;
    }
     /*限定セット*/       
    .powder-lp-discount-txt p {
        font-size: 4.2vw;
    }
    .powder-lp-feature-box {
        padding: 2vw 0 2vw 4vw;
    }
    .powder-lp-feature-box p {
        font-size: 2.1vw;
    }
    .powder-lp-feature-square p {
        font-size: 5vw;
    }
    .powder-lp-discount-smalltxt {
        padding-bottom: 4.2vw;
    }
    .powder-lp-qa-box-txt {
        padding: 3.2vw;
    }
     /*パック*/  
     .powder-lp-face-txt {
         padding: 4.2vw 0 12vw 0;
     } 
     .powder-make-txt {
         padding: 0 0 4.2vw 0;
     }   
    .powder-make-box-img {
        padding-left: 6vw;
    }
    a.btn-square-slant {
        font-size: 4vw;
    }
    p.powder-lp-case-title-icon:after {
        height: 16vw;
    }
    .powder-lp-face-detail-txt {
        padding: 0;
    }
}
</style>        