import {createIcon} from "@chakra-ui/icons";
import * as path from "path";
import logo from './logo.svg'

const MainLogo = createIcon({
        displayName: 'UpDownIcon',
        viewBox: '0 0 200 200',
        path: (
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" version="1.0" viewBox="0 0 375 375">
                <defs>
                    <clipPath id="b">
                        <path d="M85 85h205v205H85Zm0 0"/>
                    </clipPath>
                    <clipPath id="c">
                        <path d="m108.738 81.48 184.75 27.254-27.254 184.75-184.75-27.254Zm0 0"/>
                    </clipPath>
                    <clipPath id="d">
                        <path d="m108.738 81.48 184.75 27.254-27.254 184.75-184.75-27.254Zm0 0"/>
                    </clipPath>
                    <clipPath id="e">
                        <path
                            d="m137.668 85.746 126.887 18.719c15.98 2.36 27.023 17.222 24.664 33.203L270.5 264.555c-2.355 15.976-17.219 27.02-33.2 24.66l-126.886-18.719c-15.977-2.355-27.02-17.219-24.664-33.2l18.719-126.886c2.36-15.976 17.222-27.02 33.199-24.664"/>
                    </clipPath>
                    <clipPath id="f">
                        <path d="M159 201h46v47h-46Zm0 0"/>
                    </clipPath>
                    <clipPath id="g">
                        <path d="m162.918 198.879 44.828 6.613-6.613 44.828-44.828-6.613Zm0 0"/>
                    </clipPath>
                    <clipPath id="h">
                        <path
                            d="M185.332 202.184c-12.379-1.825-23.894 6.73-25.719 19.109-1.828 12.379 6.727 23.894 19.106 25.719 12.379 1.828 23.894-6.727 25.722-19.106 1.825-12.379-6.73-23.894-19.109-25.722"/>
                    </clipPath>
                    <clipPath id="i">
                        <path d="M170 127h46v47h-46Zm0 0"/>
                    </clipPath>
                    <clipPath id="j">
                        <path d="m173.863 124.684 44.828 6.613-6.613 44.824-44.824-6.613Zm0 0"/>
                    </clipPath>
                    <clipPath id="k">
                        <path
                            d="M196.277 127.988c-12.379-1.824-23.89 6.73-25.718 19.106-1.825 12.379 6.726 23.894 19.105 25.722 12.379 1.825 23.895-6.73 25.723-19.109 1.824-12.379-6.73-23.89-19.11-25.719"/>
                    </clipPath>
                    <clipPath id="l">
                        <path d="M128 159h46v46h-46Zm0 0"/>
                    </clipPath>
                    <clipPath id="m">
                        <path d="m131.605 156.355 44.829 6.614-6.614 44.824-44.824-6.613Zm0 0"/>
                    </clipPath>
                    <clipPath id="n">
                        <path
                            d="M154.02 159.66c-12.38-1.824-23.895 6.73-25.72 19.106-1.823 12.379 6.727 23.894 19.106 25.722 12.38 1.825 23.895-6.73 25.723-19.11 1.824-12.378-6.73-23.89-19.11-25.718"/>
                    </clipPath>
                    <clipPath id="o">
                        <path d="M201 170h46v46h-46Zm0 0"/>
                    </clipPath>
                    <clipPath id="p">
                        <path d="m205.176 167.207 44.828 6.613-6.613 44.828-44.825-6.613Zm0 0"/>
                    </clipPath>
                    <clipPath id="q">
                        <path
                            d="M227.59 170.512c-12.38-1.825-23.895 6.73-25.719 19.11-1.828 12.378 6.727 23.894 19.106 25.718 12.378 1.828 23.894-6.727 25.722-19.106 1.824-12.379-6.73-23.894-19.11-25.722"/>
                    </clipPath>
                    <radialGradient id="a" cx="0" cy="0" r="530.33" fx="0" fy="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#8C6FFE"/>
                        <stop offset=".004" stop-color="#8B6EFE"/>
                        <stop offset=".008" stop-color="#8A6EFE"/>
                        <stop offset=".012" stop-color="#8A6EFE"/>
                        <stop offset=".016" stop-color="#896DFE"/>
                        <stop offset=".02" stop-color="#886DFE"/>
                        <stop offset=".023" stop-color="#876CFE"/>
                        <stop offset=".027" stop-color="#876CFE"/>
                        <stop offset=".031" stop-color="#866CFE"/>
                        <stop offset=".035" stop-color="#856BFE"/>
                        <stop offset=".039" stop-color="#856BFE"/>
                        <stop offset=".043" stop-color="#846BFE"/>
                        <stop offset=".047" stop-color="#836AFE"/>
                        <stop offset=".051" stop-color="#826AFE"/>
                        <stop offset=".055" stop-color="#8269FE"/>
                        <stop offset=".059" stop-color="#8169FE"/>
                        <stop offset=".063" stop-color="#8069FE"/>
                        <stop offset=".066" stop-color="#8068FE"/>
                        <stop offset=".07" stop-color="#7F68FE"/>
                        <stop offset=".074" stop-color="#7E67FE"/>
                        <stop offset=".078" stop-color="#7D67FE"/>
                        <stop offset=".082" stop-color="#7D67FE"/>
                        <stop offset=".086" stop-color="#7C66FE"/>
                        <stop offset=".09" stop-color="#7B66FE"/>
                        <stop offset=".094" stop-color="#7B66FE"/>
                        <stop offset=".098" stop-color="#7A65FE"/>
                        <stop offset=".102" stop-color="#7965FE"/>
                        <stop offset=".105" stop-color="#7864FE"/>
                        <stop offset=".109" stop-color="#7864FE"/>
                        <stop offset=".113" stop-color="#7764FE"/>
                        <stop offset=".117" stop-color="#7663FE"/>
                        <stop offset=".121" stop-color="#7663FE"/>
                        <stop offset=".125" stop-color="#7562FE"/>
                        <stop offset=".129" stop-color="#7462FE"/>
                        <stop offset=".133" stop-color="#7362FE"/>
                        <stop offset=".137" stop-color="#7361FE"/>
                        <stop offset=".141" stop-color="#7261FE"/>
                        <stop offset=".145" stop-color="#7161FE"/>
                        <stop offset=".148" stop-color="#7160FE"/>
                        <stop offset=".152" stop-color="#7060FE"/>
                        <stop offset=".156" stop-color="#6F5FFE"/>
                        <stop offset=".16" stop-color="#6E5FFE"/>
                        <stop offset=".164" stop-color="#6E5FFE"/>
                        <stop offset=".168" stop-color="#6D5EFE"/>
                        <stop offset=".172" stop-color="#6C5EFE"/>
                        <stop offset=".176" stop-color="#6C5EFE"/>
                        <stop offset=".18" stop-color="#6B5DFE"/>
                        <stop offset=".184" stop-color="#6A5DFE"/>
                        <stop offset=".188" stop-color="#695CFE"/>
                        <stop offset=".191" stop-color="#695CFE"/>
                        <stop offset=".195" stop-color="#685CFE"/>
                        <stop offset=".199" stop-color="#675BFE"/>
                        <stop offset=".203" stop-color="#675BFE"/>
                        <stop offset=".207" stop-color="#665AFE"/>
                        <stop offset=".211" stop-color="#655AFE"/>
                        <stop offset=".215" stop-color="#655AFE"/>
                        <stop offset=".219" stop-color="#6459FE"/>
                        <stop offset=".223" stop-color="#6359FE"/>
                        <stop offset=".227" stop-color="#6259FE"/>
                        <stop offset=".23" stop-color="#6258FE"/>
                        <stop offset=".234" stop-color="#6158FE"/>
                        <stop offset=".238" stop-color="#6057FE"/>
                        <stop offset=".242" stop-color="#6057FE"/>
                        <stop offset=".246" stop-color="#5F57FE"/>
                        <stop offset=".25" stop-color="#5E56FE"/>
                        <stop offset=".254" stop-color="#5D56FE"/>
                        <stop offset=".258" stop-color="#5D55FF"/>
                        <stop offset=".262" stop-color="#5C55FF"/>
                        <stop offset=".266" stop-color="#5B55FF"/>
                        <stop offset=".27" stop-color="#5B54FF"/>
                        <stop offset=".273" stop-color="#5A54FF"/>
                        <stop offset=".277" stop-color="#5954FF"/>
                        <stop offset=".281" stop-color="#5853FF"/>
                        <stop offset=".285" stop-color="#5853FF"/>
                        <stop offset=".289" stop-color="#5752FF"/>
                        <stop offset=".293" stop-color="#5652FF"/>
                        <stop offset=".297" stop-color="#5652FF"/>
                        <stop offset=".301" stop-color="#5551FF"/>
                        <stop offset=".305" stop-color="#5451FF"/>
                        <stop offset=".309" stop-color="#5351FF"/>
                        <stop offset=".313" stop-color="#5350FF"/>
                        <stop offset=".316" stop-color="#5250FF"/>
                        <stop offset=".32" stop-color="#514FFF"/>
                        <stop offset=".324" stop-color="#514FFF"/>
                        <stop offset=".328" stop-color="#504FFF"/>
                        <stop offset=".332" stop-color="#4F4EFF"/>
                        <stop offset=".336" stop-color="#4E4EFF"/>
                        <stop offset=".34" stop-color="#4E4DFF"/>
                        <stop offset=".344" stop-color="#4D4DFF"/>
                        <stop offset=".348" stop-color="#4C4DFF"/>
                        <stop offset=".352" stop-color="#4C4CFF"/>
                        <stop offset=".355" stop-color="#4B4CFF"/>
                        <stop offset=".359" stop-color="#4A4CFF"/>
                        <stop offset=".363" stop-color="#494BFF"/>
                        <stop offset=".367" stop-color="#494BFF"/>
                        <stop offset=".371" stop-color="#484AFF"/>
                        <stop offset=".375" stop-color="#474AFF"/>
                        <stop offset=".379" stop-color="#474AFF"/>
                        <stop offset=".383" stop-color="#4649FF"/>
                        <stop offset=".387" stop-color="#4549FF"/>
                        <stop offset=".391" stop-color="#4548FF"/>
                        <stop offset=".395" stop-color="#4448FF"/>
                        <stop offset=".398" stop-color="#4348FF"/>
                        <stop offset=".402" stop-color="#4247FF"/>
                        <stop offset=".406" stop-color="#4247FF"/>
                        <stop offset=".41" stop-color="#4147FF"/>
                        <stop offset=".414" stop-color="#4046FF"/>
                        <stop offset=".418" stop-color="#4046FF"/>
                        <stop offset=".422" stop-color="#3F45FF"/>
                        <stop offset=".426" stop-color="#3E45FF"/>
                        <stop offset=".43" stop-color="#3D45FF"/>
                        <stop offset=".434" stop-color="#3D44FF"/>
                        <stop offset=".438" stop-color="#3C44FF"/>
                        <stop offset=".441" stop-color="#3B44FF"/>
                        <stop offset=".445" stop-color="#3B43FF"/>
                        <stop offset=".449" stop-color="#3A43FF"/>
                        <stop offset=".453" stop-color="#3942FF"/>
                        <stop offset=".457" stop-color="#3842FF"/>
                        <stop offset=".461" stop-color="#3842FF"/>
                        <stop offset=".465" stop-color="#3741FF"/>
                        <stop offset=".469" stop-color="#3641FF"/>
                        <stop offset=".473" stop-color="#3640FF"/>
                        <stop offset=".477" stop-color="#3540FF"/>
                        <stop offset=".48" stop-color="#3440FF"/>
                        <stop offset=".484" stop-color="#333FFF"/>
                        <stop offset=".488" stop-color="#333FFF"/>
                        <stop offset=".492" stop-color="#323FFF"/>
                        <stop offset=".496" stop-color="#313EFF"/>
                        <stop offset=".5" stop-color="#313EFE"/>
                        <stop offset=".504" stop-color="#313EFC"/>
                        <stop offset=".508" stop-color="#313DFB"/>
                        <stop offset=".512" stop-color="#303DF9"/>
                        <stop offset=".516" stop-color="#303DF7"/>
                        <stop offset=".52" stop-color="#303DF5"/>
                        <stop offset=".523" stop-color="#303CF4"/>
                        <stop offset=".527" stop-color="#303CF2"/>
                        <stop offset=".531" stop-color="#303CF0"/>
                        <stop offset=".535" stop-color="#2F3BEE"/>
                        <stop offset=".539" stop-color="#2F3BED"/>
                        <stop offset=".543" stop-color="#2F3BEB"/>
                        <stop offset=".547" stop-color="#2F3BE9"/>
                        <stop offset=".551" stop-color="#2F3AE7"/>
                        <stop offset=".555" stop-color="#2F3AE6"/>
                        <stop offset=".559" stop-color="#2E3AE4"/>
                        <stop offset=".563" stop-color="#2E3AE2"/>
                        <stop offset=".566" stop-color="#2E39E0"/>
                        <stop offset=".57" stop-color="#2E39DF"/>
                        <stop offset=".574" stop-color="#2E39DD"/>
                        <stop offset=".578" stop-color="#2E39DB"/>
                        <stop offset=".582" stop-color="#2D38DA"/>
                        <stop offset=".586" stop-color="#2D38D8"/>
                        <stop offset=".59" stop-color="#2D38D6"/>
                        <stop offset=".594" stop-color="#2D37D4"/>
                        <stop offset=".598" stop-color="#2D37D3"/>
                        <stop offset=".602" stop-color="#2D37D1"/>
                        <stop offset=".605" stop-color="#2C37CF"/>
                        <stop offset=".609" stop-color="#2C36CD"/>
                        <stop offset=".613" stop-color="#2C36CC"/>
                        <stop offset=".617" stop-color="#2C36CA"/>
                        <stop offset=".621" stop-color="#2C36C8"/>
                        <stop offset=".625" stop-color="#2C35C6"/>
                        <stop offset=".629" stop-color="#2B35C5"/>
                        <stop offset=".633" stop-color="#2B35C3"/>
                        <stop offset=".637" stop-color="#2B35C1"/>
                        <stop offset=".641" stop-color="#2B34BF"/>
                        <stop offset=".645" stop-color="#2B34BE"/>
                        <stop offset=".648" stop-color="#2B34BC"/>
                        <stop offset=".652" stop-color="#2B33BA"/>
                        <stop offset=".656" stop-color="#2A33B8"/>
                        <stop offset=".66" stop-color="#2A33B7"/>
                        <stop offset=".664" stop-color="#2A33B5"/>
                        <stop offset=".668" stop-color="#2A32B3"/>
                        <stop offset=".672" stop-color="#2A32B1"/>
                        <stop offset=".676" stop-color="#2A32B0"/>
                        <stop offset=".68" stop-color="#2932AE"/>
                        <stop offset=".684" stop-color="#2931AC"/>
                        <stop offset=".688" stop-color="#2931AA"/>
                        <stop offset=".691" stop-color="#2931A9"/>
                        <stop offset=".695" stop-color="#2931A7"/>
                        <stop offset=".699" stop-color="#2930A5"/>
                        <stop offset=".703" stop-color="#2830A3"/>
                        <stop offset=".707" stop-color="#2830A2"/>
                        <stop offset=".711" stop-color="#2830A0"/>
                        <stop offset=".715" stop-color="#282F9E"/>
                        <stop offset=".719" stop-color="#282F9D"/>
                        <stop offset=".723" stop-color="#282F9B"/>
                        <stop offset=".727" stop-color="#272E99"/>
                        <stop offset=".73" stop-color="#272E97"/>
                        <stop offset=".734" stop-color="#272E96"/>
                        <stop offset=".738" stop-color="#272E94"/>
                        <stop offset=".742" stop-color="#272D92"/>
                        <stop offset=".746" stop-color="#272D90"/>
                        <stop offset=".75" stop-color="#262D8F"/>
                        <stop offset=".754" stop-color="#262D8D"/>
                        <stop offset=".758" stop-color="#262C8B"/>
                        <stop offset=".762" stop-color="#262C89"/>
                        <stop offset=".766" stop-color="#262C88"/>
                        <stop offset=".77" stop-color="#262C86"/>
                        <stop offset=".773" stop-color="#252B84"/>
                        <stop offset=".777" stop-color="#252B82"/>
                        <stop offset=".781" stop-color="#252B81"/>
                        <stop offset=".785" stop-color="#252A7F"/>
                        <stop offset=".789" stop-color="#252A7D"/>
                        <stop offset=".793" stop-color="#252A7B"/>
                        <stop offset=".797" stop-color="#242A7A"/>
                        <stop offset=".801" stop-color="#242978"/>
                        <stop offset=".805" stop-color="#242976"/>
                        <stop offset=".809" stop-color="#242974"/>
                        <stop offset=".813" stop-color="#242973"/>
                        <stop offset=".816" stop-color="#242871"/>
                        <stop offset=".82" stop-color="#23286F"/>
                        <stop offset=".824" stop-color="#23286D"/>
                        <stop offset=".828" stop-color="#23286C"/>
                        <stop offset=".832" stop-color="#23276A"/>
                        <stop offset=".836" stop-color="#232768"/>
                        <stop offset=".84" stop-color="#232766"/>
                        <stop offset=".844" stop-color="#232765"/>
                        <stop offset=".848" stop-color="#222663"/>
                        <stop offset=".852" stop-color="#222661"/>
                        <stop offset=".855" stop-color="#222660"/>
                        <stop offset=".859" stop-color="#22255E"/>
                        <stop offset=".863" stop-color="#22255C"/>
                        <stop offset=".867" stop-color="#22255A"/>
                        <stop offset=".871" stop-color="#212559"/>
                        <stop offset=".875" stop-color="#212457"/>
                        <stop offset=".879" stop-color="#212455"/>
                        <stop offset=".883" stop-color="#212453"/>
                        <stop offset=".887" stop-color="#212452"/>
                        <stop offset=".891" stop-color="#212350"/>
                        <stop offset=".895" stop-color="#20234E"/>
                        <stop offset=".898" stop-color="#20234C"/>
                        <stop offset=".902" stop-color="#20234B"/>
                        <stop offset=".906" stop-color="#202249"/>
                        <stop offset=".91" stop-color="#202247"/>
                        <stop offset=".914" stop-color="#202245"/>
                        <stop offset=".918" stop-color="#1F2144"/>
                        <stop offset=".922" stop-color="#1F2142"/>
                        <stop offset=".926" stop-color="#1F2140"/>
                        <stop offset=".93" stop-color="#1F213E"/>
                        <stop offset=".934" stop-color="#1F203D"/>
                        <stop offset=".938" stop-color="#1F203B"/>
                        <stop offset=".941" stop-color="#1E2039"/>
                        <stop offset=".945" stop-color="#1E2037"/>
                        <stop offset=".949" stop-color="#1E1F36"/>
                        <stop offset=".953" stop-color="#1E1F34"/>
                        <stop offset=".957" stop-color="#1E1F32"/>
                        <stop offset=".961" stop-color="#1E1F30"/>
                        <stop offset=".965" stop-color="#1D1E2F"/>
                        <stop offset=".969" stop-color="#1D1E2D"/>
                        <stop offset=".973" stop-color="#1D1E2B"/>
                        <stop offset=".977" stop-color="#1D1E29"/>
                        <stop offset=".98" stop-color="#1D1D28"/>
                        <stop offset=".984" stop-color="#1D1D26"/>
                        <stop offset=".988" stop-color="#1C1D24"/>
                        <stop offset=".992" stop-color="#1C1C22"/>
                        <stop offset=".996" stop-color="#1C1C21"/>
                        <stop offset="1" stop-color="#1C1C20"/>
                    </radialGradient>
                </defs>
                <path fill="url(#a)" d="M-37.5-37.5h450v450h-450z"/>
                <g clip-path="url(#b)">
                    <g clip-path="url(#c)">
                        <g clip-path="url(#d)">
                            <g clip-path="url(#e)">
                                <path fill="none" stroke="#edc000" stroke-width="11.99856"
                                      d="m137.668 85.746 126.887 18.719c15.98 2.36 27.023 17.222 24.664 33.203L270.5 264.555c-2.355 15.976-17.219 27.02-33.199 24.66l-126.887-18.719c-15.976-2.355-27.02-17.219-24.664-33.199L104.47 110.41c2.36-15.976 17.222-27.02 33.199-24.664"/>
                            </g>
                        </g>
                    </g>
                </g>
                <g clip-path="url(#f)">
                    <g clip-path="url(#g)">
                        <g clip-path="url(#h)">
                            <path fill="#edc000" d="m162.918 198.879 44.828 6.613-6.613 44.828-44.828-6.613Zm0 0"/>
                        </g>
                    </g>
                </g>
                <g clip-path="url(#i)">
                    <g clip-path="url(#j)">
                        <g clip-path="url(#k)">
                            <path fill="#edc000" d="m173.863 124.684 44.828 6.613-6.613 44.824-44.824-6.613Zm0 0"/>
                        </g>
                    </g>
                </g>
                <g clip-path="url(#l)">
                    <g clip-path="url(#m)">
                        <g clip-path="url(#n)">
                            <path fill="#edc000" d="m131.605 156.355 44.829 6.614-6.614 44.824-44.824-6.613Zm0 0"/>
                        </g>
                    </g>
                </g>
                <g clip-path="url(#o)">
                    <g clip-path="url(#p)">
                        <g clip-path="url(#q)">
                            <path fill="#edc000" d="m205.176 167.207 44.828 6.613-6.613 44.828-44.825-6.613Zm0 0"/>
                        </g>
                    </g>
                </g>
            </svg>

        )
        // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.

    }
)

export default MainLogo;