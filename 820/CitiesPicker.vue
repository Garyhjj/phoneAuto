<template>
	<div class="cities-picker">
		<div class="select-hot-cities">
      <div class="select-top">
        <div class="hot-cities-box">
          <span>
            <template v-if="$slots.label">
              <slot name="label"></slot>
            </template>
            <template v-else>选择城市:</template>
          </span>
          <div class="select-bottom tag-after-label" v-if="hideBottomTags">
            <a-tag v-if="selectedCities && selectedCities.length > 0"
                 closable
                 @close="removeSelectedCity(selectedCities[0].id)"
                 color="#E1EEEF">
            {{ selectedCities[0].shortName }}
            </a-tag>
          </div>

          <div class="hot-cities" v-if="HotCities && HotCities.length">
            <span v-for="city in HotCities" :key="city.id + city.name" @click="addCity(city)" class="city">
                <slot name="hot" :city="city">{{ city.shortName }}</slot>
            </span>
          </div>
        </div>
        <div class="view-all" @click="viewAllCities">
          <span>全部</span>
          <a-icon type="right" />
        </div>
      </div>
      <div class="select-bottom" v-if="!hideBottomTags">
        <span v-if="selectedCities && selectedCities.length">
          <a-tag v-for="selectedCity in selectedCities"
                 :key="selectedCity.id"
                 closable
                 @close="removeSelectedCity(selectedCity.id)"
                 color="#E1EEEF">
            {{ selectedCity.shortName }}
          </a-tag>
        </span>
        <div v-if="!checkSelectedNumber()">
          <a-input class="add-city-input"
                  v-if="showInputBox"
                  type="text"
                  placeholder="请输入城市名称"
                  :value="inputCityName"
                  @change="handleInputChange"
                  @blur="addCityByName"
                  @keyup.enter="addCityByName"
                  v-focus />
          <span v-if="!showInputBox" @click="showAddCityInput" class="add-city">添加城市</span>
        </div>
      </div>
		</div>
    <div class="cities-picker-modal" v-if="showCityPickerPanel">
      <div class="cities-picker-panel">
        <div class="panel-top">
          <span>请选择城市</span>
          <HroIcon class="close"
                  @click="viewAllCities"
                  type='iconguanbi' />
        </div>
        <div class="panel-center">
          <a-tabs>
            <a-tab-pane key="热门城市" tab="热门城市">
              <div class="panel-cities-box panel-hot-cities-box">
                <div class="cities">
                  <span class="panel-city" v-for="city in HotCities" :key="city.id + city.name" @click="addCity(city)">{{ city.shortName }}</span>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane v-for="(groups, index) in CitieGroups" :key="LetterGroups[index]" :tab="LetterGroups[index]">
              <div class="panel-cities-box">
                <div v-for="group in groups" :key="group.ckey" class="panel-cities">
                  <span class="panel-letter">{{ group.ckey }}</span>
                  <div class="cities">
                    <span class="panel-city" v-for="city in group.cities" :key="city.title + city.id" @click="addCity(city)">{{ city.shortName }}</span>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
          <div class="select-bottom">
            <span v-if="selectedInModal && selectedInModal.length">
              <a-tag v-for="selected in selectedInModal"
                    :key="selected.id"
                    closable
                    @close="removeSelectedCity(selected.id)"
                    color="#E1EEEF">
                {{ selected.shortName }}
              </a-tag>
            </span>
            <div v-if="!checkSelectedNumber()">
              <a-input class="add-city-input"
                      v-if="showInputBox"
                      type="text"
                      placeholder="请输入城市名称"
                      :value="inputCityName"
                      @change="handleInputChange"
                      @blur="addCityByName"
                      @keyup.enter="addCityByName"
                      v-focus />
              <span v-if="!showInputBox && !(isRadio && selectedInModal.length > 0)" @click="showAddCityInput" class="add-city">添加城市</span>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <HroButton pattern="sub" @click="viewAllCities">取消</HroButton>
          <HroButton pattern="main" class="btn-right" @click="modalConfirm">确认</HroButton>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import * as Constants from '@/config/cities-picker';

export default {
  /**
    * [initCities: 已选城市初始值, @selectedCities: 返回已选择城市，数据结构与initCities相同]
    * initCities: [{
                deep: "1"
                ext_id: "110100000000"
                ext_name: "市辖区"
                id: "1101"
                name: "1101"
                pid: "11"
                pinyin: "bei jing"
                pinyin_prefix: "b"
                shortName: "北京"
                title: "市辖区"
              }]
    * 调用参考：
      <CitiesPicker @selectedCities="selectedCities" cities="initSelectedCities" />
    */
  props: {
    initCities: {
      type: Array,
      default: function() {
        return [];
      }
    },
    hideBottomTags: {
      type: Boolean,
    },
    isRadio: {
      type: Boolean,
    }
  },
	data() {
		return {
      ...Constants, // AllCities, HotCities, CitieGroups, LetterGroups
      selectedCities: [],
      selectedInModal: [],
      showInputBox: false,
      inputCityName: '',
      showCityPickerPanel: false
		};
  },
	mounted() {
    this.selectedCities = this.initCities;
    console.log(this.$slots)
	},
	watch: {
		// 监听到数据然后赋值
		initCities(newV, oldV) {
			this.selectedCities = this.initCities;
		}
	},
  methods: {
    removeSelectedCity(id) {
      let cities = this.getCurrSelectedCities();
      cities = cities.filter(city => city.id != id);
      this.setCurrSelectedCities(cities);
    },
    showAddCityInput() {
      this.showInputBox = true;
    },
    handleInputChange(e) {
      this.inputCityName = e.target.value;
    },
    addCity(city) {
      if(!city || this.checkSelectedNumber()) return;
      const cities = this.getCurrSelectedCities();
      if (this.isRadio) {
        this.setCurrSelectedCities([city]);
      } else {
        const isSelected = this.getCityById(city.id, cities).length != 0;
        !isSelected && cities.push(city);
        this.setCurrSelectedCities(cities);
      }
    },
    addCityByName() {
      if(this.checkSelectedNumber()) return;
      let cities = this.getCurrSelectedCities();
      const inputValue = this.inputCityName;
      const isSelected = this.getCityByName(inputValue, cities).length != 0;
      if (inputValue && !isSelected) {
        const inputCity = this.getCityByName(inputValue, this.AllCities);
        cities = this.isRadio? [...inputCity]: [...cities, ...inputCity];
      }
      this.setCurrSelectedCities(cities);
      this.inputCityName = '';
      this.showInputBox = false;
    },
    getCityByName(name, cities) {
      return cities.filter(city => city.shortName == name || city.title == name || city.ext_name == name);
    },
    getCityById(id, cities) {
      return cities.filter(c => id == c.id);
    },
    viewAllCities() {
      this.showCityPickerPanel = !this.showCityPickerPanel;
      if(this.showCityPickerPanel) this.selectedInModal = [].concat(this.selectedCities);
    },
    checkSelectedNumber() {
      const limit = 5;
      const cities = this.getCurrSelectedCities();
      return cities.length >= limit;
    },
    getCurrSelectedCities() {
      return this.showCityPickerPanel ? this.selectedInModal : this.selectedCities;
    },
    setCurrSelectedCities(cities) {
      this.showCityPickerPanel ? (this.selectedInModal = cities) : (this.selectedCities = cities);
      this.sendDataToParent();
    },
    modalConfirm() {
      this.selectedCities = this.selectedInModal;
      this.showCityPickerPanel = false;
      this.sendDataToParent();
    },
    sendDataToParent() {
      !this.showCityPickerPanel && this.$emit('selectedCities',this.isRadio? this.selectedCities[0]: this.selectedCities);
    }

  }
};
</script>

<style scoped lang="less">
@import '../../assets/less/hro-theme.less';
.cities-picker {
  .select-bottom {
    height: 40px;
    padding: 0 16px;
    background-color: @background-color;
    display: flex;
    align-items: center;
    &.tag-after-label {
      height: 24px;
      padding: 0;
      background-color: @white;
      /deep/.ant-tag {
         margin-right: 8px;
         margin-left: 30px;
      }
    }
    .add-city {
      color: @input-normal;
      font-size: 14px;
      cursor: pointer;
    }
    /deep/.ant-tag {
      color: @primary-color;
      height: 24px;
      line-height: 24px;
      margin-right: 16px;
      border: none;
      position: relative;
      padding: 0 30px 0 6px;
      .anticon-close {
        background-color: @primary-color;
        border-radius: 50%;
        padding: 2px;
        font-size: 8px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 6px;
      }
    }
    /deep/.add-city-input.ant-input {
      height: 24px;
      width: 128px;
    }
  }
  .select-hot-cities {
    .select-top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 14px;
        color: @text-color-secondary;
        margin: 16px 0;
      .hot-cities-box {
        display: flex;
        align-items: center;
        .hot-cities {
          margin-left: 16px;
          cursor: pointer;
          span.city {
            padding-right: 30px;
            color: @text-color-body;
          }
        }
      }
      .view-all {
        display: flex;
        cursor: pointer;
        > span {
          margin-right: 4px;
        }
        /deep/.anticon {
          color: @text-color-secondary;
          font-size: 10px;
          line-height: 14px;
        }
      }
    }
  }
  .cities-picker-modal {
    position: fixed;
    background-color: @modal-background;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 15;
    .cities-picker-panel {
      width: 816px;
      margin: 0 auto;
      background-color: @white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .panel-top {
        padding: 24px;
        line-height: 16px;
        font-size: 16px;
        span {
          color: @text-color;
          font-weight: 500;
        }
        i.close.anticon {
          float: right;
          color: @icon-color-tab;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .panel-center {
        /deep/.ant-tabs {
          .ant-tabs-bar {
            margin: 0;
            background-color: @line-color;
            border: none;
            .ant-tabs-nav {
              padding: 0 24px;
              width: 100%;
              > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .ant-tabs-tab {
                  padding: 13px 0;
                  margin: 0;
                  &.ant-tabs-tab-active {
                    position: relative;
                    &::after {
                      content: ' ';
                      width: 100%;
                      height: 1px;
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      background-color: @input-selected;
                    }
                    border-bottom: 1px solid @input-selected;
                  }
                }
              }
              .ant-tabs-ink-bar {
                display: none !important;
              }
            }
          }
        }
        .panel-hot-cities-box {
          padding-left: 54px;
          .cities {
            grid-template-columns: repeat(6, 16.7%) !important;
          }
        }
        .panel-cities-box {
          height: 480px;
          padding-top: 29px;
          overflow-x: hidden;
          font-size: 14px;
          line-height: 1;
          .panel-cities {
            display: flex;
            .panel-letter {
              margin: 0 47px;
              color: @primary-color;
            }
          }
          .cities {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(5, 20%);
          }
          .panel-city {
            display: inline-block;
            color: @text-color-body;
            margin-bottom: 42px;
            cursor: pointer;
          }
        }
        .select-bottom {
          margin: 3px 24px 32px;
        }
      }
      .panel-footer {
        padding-bottom: 24px;
        padding-right: 16px;
        text-align: right;
        button {
          margin-right: 16px;
          height: 32px;
        }
      }
    }
  }
}
</style>